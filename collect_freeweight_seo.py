import csv
import html
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parent
PYDATE = "2026-07-04"

SEED_KEYWORDS = [
    "dumbbell",
    "weight plates",
    "bumper plates",
    "rubber dumbbells",
]

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36"
)

B2B_MARKERS = {
    "wholesale",
    "bulk",
    "supplier",
    "manufacturer",
    "factory",
    "commercial",
    "distributor",
    "oem",
    "custom",
    "for gym",
    "gym equipment",
    "import",
    "china",
    "quote",
    "minimum order",
    "moq",
}

B2C_MARKERS = {
    "best",
    "amazon",
    "walmart",
    "target",
    "near me",
    "for home",
    "home gym",
    "buy",
    "sale",
    "cheap",
    "set",
    "adjustable",
    "pair",
}

INFO_MARKERS = {
    "what",
    "how",
    "why",
    "guide",
    "review",
    "reviews",
    "compare",
    "comparison",
    "vs",
    "difference",
    "meaning",
    "size",
    "chart",
    "workout",
    "exercises",
    "maintenance",
    "clean",
    "care",
}


def fetch(url, timeout=20):
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as res:
            charset = res.headers.get_content_charset() or "utf-8"
            raw = res.read()
            return raw.decode(charset, errors="replace"), res.geturl()
    except Exception as exc:
        return "", f"ERROR: {exc}"


def clean_text(value):
    value = html.unescape(value or "")
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def unique_keep_order(items):
    seen = set()
    out = []
    for item in items:
        item = clean_text(item)
        low = item.lower()
        if item and low not in seen:
            seen.add(low)
            out.append(item)
    return out


def google_serp(keyword):
    url = "https://www.google.com/search?" + urllib.parse.urlencode(
        {"q": keyword, "num": 10, "hl": "en", "gl": "us", "pws": 0}
    )
    body, final_url = fetch(url)
    candidates = []
    for raw_href in re.findall(r'href="([^"]+)"', body):
        href = html.unescape(raw_href)
        target = ""
        if href.startswith("/url?"):
            target = urllib.parse.parse_qs(urllib.parse.urlparse(href).query).get("q", [""])[0]
        elif href.startswith("http"):
            target = href
        if not target:
            continue
        host = urllib.parse.urlparse(target).netloc.lower()
        if not host or "google." in host or "youtube.com" in host:
            continue
        if any(x in target for x in ["accounts.google", "support.google", "policies.google"]):
            continue
        candidates.append(target)
    candidates = unique_keep_order(candidates)[:10]
    if candidates:
        return candidates, final_url
    return duckduckgo_serp(keyword)


def duckduckgo_serp(keyword):
    url = "https://html.duckduckgo.com/html/?" + urllib.parse.urlencode({"q": keyword})
    body, final_url = fetch(url)
    candidates = []
    for raw_href in re.findall(r'class="result__a" href="([^"]+)"', body):
        href = html.unescape(raw_href)
        if href.startswith("//"):
            href = "https:" + href
        parsed = urllib.parse.urlparse(href)
        if "duckduckgo.com" in parsed.netloc:
            target = urllib.parse.parse_qs(parsed.query).get("uddg", [""])[0]
        else:
            target = href
        host = urllib.parse.urlparse(target).netloc.lower()
        if target and host and "duckduckgo.com" not in host:
            candidates.append(target)
    return unique_keep_order(candidates)[:10], f"{final_url} (fallback: Google blocked)"


class SEOParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.meta_description = ""
        self.h1 = []
        self.h2 = []
        self.image_alt = []
        self._tag_stack = []
        self._capture = None
        self._buf = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        tag = tag.lower()
        self._tag_stack.append(tag)
        if tag == "title":
            self._capture = "title"
            self._buf = []
        elif tag in {"h1", "h2"}:
            self._capture = tag
            self._buf = []
        elif tag == "meta":
            name = (attrs.get("name") or attrs.get("property") or "").lower()
            if name in {"description", "og:description"} and not self.meta_description:
                self.meta_description = clean_text(attrs.get("content", ""))
        elif tag == "img":
            alt = clean_text(attrs.get("alt", ""))
            if alt:
                self.image_alt.append(alt)

    def handle_endtag(self, tag):
        tag = tag.lower()
        if self._capture == tag:
            text = clean_text("".join(self._buf))
            if text:
                if tag == "title" and not self.title:
                    self.title = text
                elif tag == "h1":
                    self.h1.append(text)
                elif tag == "h2":
                    self.h2.append(text)
            self._capture = None
            self._buf = []
        if self._tag_stack:
            self._tag_stack.pop()

    def handle_data(self, data):
        if self._capture:
            self._buf.append(data)


def parse_page(url):
    body, final_url = fetch(url)
    parser = SEOParser()
    if body:
        try:
            parser.feed(body)
        except Exception:
            pass
    return {
        "url": url,
        "final_url": final_url if not final_url.startswith("ERROR:") else "",
        "fetch_status": "ok" if body else final_url,
        "title": clean_text(parser.title),
        "h1": " | ".join(unique_keep_order(parser.h1)[:5]),
        "h2": " | ".join(unique_keep_order(parser.h2)[:12]),
        "meta_description": clean_text(parser.meta_description),
        "image_alt": " | ".join(unique_keep_order(parser.image_alt)[:20]),
    }


def google_suggest(query):
    url = "https://suggestqueries.google.com/complete/search?" + urllib.parse.urlencode(
        {"client": "firefox", "hl": "en", "gl": "us", "q": query}
    )
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            data = json.loads(res.read().decode("utf-8", errors="replace"))
        return data[1]
    except Exception:
        return []


def extract_questions_from_serp(keyword):
    url = "https://www.google.com/search?" + urllib.parse.urlencode(
        {"q": keyword, "num": 10, "hl": "en", "gl": "us", "pws": 0}
    )
    body, _ = fetch(url)
    text = clean_text(re.sub(r"<[^>]+>", " ", body))
    questions = re.findall(
        r"\b(?:what|how|why|where|when|which|are|is|do|does|can|should)[^?.!]{8,120}\?",
        text,
        flags=re.I,
    )
    return unique_keep_order(questions)[:12]


def related_like_terms(seed):
    patterns = [
        "best {k}",
        "{k} wholesale",
        "{k} manufacturer",
        "{k} supplier",
        "{k} factory",
        "{k} bulk",
        "{k} for commercial gym",
        "{k} for home gym",
        "{k} price",
        "{k} cost",
        "{k} set",
        "{k} sizes",
        "{k} dimensions",
        "{k} weight chart",
        "{k} vs",
        "how to choose {k}",
        "how to clean {k}",
        "where to buy {k}",
        "{k} near me",
        "{k} amazon",
        "{k} review",
    ]
    terms = [p.format(k=seed) for p in patterns]
    if "dumbbell" in seed:
        terms += [
            "hex rubber dumbbells",
            "urethane dumbbells vs rubber dumbbells",
            "fixed dumbbell set commercial",
            "custom logo dumbbells",
            "rubber coated dumbbells wholesale",
        ]
    if "plate" in seed:
        terms += [
            "olympic weight plates",
            "cast iron weight plates",
            "rubber coated weight plates",
            "urethane weight plates",
            "weight plates wholesale",
            "custom logo weight plates",
        ]
    if "bumper" in seed:
        terms += [
            "competition bumper plates",
            "crumb rubber bumper plates",
            "virgin rubber bumper plates",
            "color bumper plates",
            "bumper plates wholesale",
            "bumper plates kg vs lb",
        ]
    return terms


def classify_keyword(keyword):
    low = keyword.lower()
    if any(m in low for m in B2B_MARKERS):
        return "B2B"
    if any(m in low for m in INFO_MARKERS):
        return "informational"
    if any(m in low for m in B2C_MARKERS):
        return "B2C"
    return "B2C" if any(x in low for x in ["dumbbell", "plate"]) else "informational"


def ai_queries():
    rows = []
    scenarios = {
        "procurement": [
            "Which {k} suppliers are best for importing commercial gym equipment from China?",
            "What should I ask a {k} manufacturer before placing a bulk order?",
            "How do I evaluate MOQ, lead time, and quality control for {k} wholesale orders?",
            "Can you help me compare OEM {k} factories for a private label fitness brand?",
        ],
        "comparison": [
            "What is the difference between rubber, urethane, and cast iron {k}?",
            "Which {k} are better for commercial gyms versus home gyms?",
            "Compare cheap {k} and premium {k} for durability and odor.",
            "Are China-made {k} reliable compared with US retail brands?",
        ],
        "selection": [
            "How do I choose the right {k} for a new gym opening?",
            "What specifications matter most when buying {k} in bulk?",
            "What sizes and weight increments should a gym buy for {k}?",
            "Which {k} are safest for beginners and high-traffic training areas?",
        ],
        "pricing": [
            "What is a reasonable wholesale price for {k} in 2026?",
            "How much do {k} cost when importing a full container from China?",
            "What affects the landed cost of {k}, including shipping and duty?",
            "Can you estimate a quote for custom logo {k} for a gym chain?",
        ],
        "maintenance": [
            "How should commercial gyms clean and maintain {k}?",
            "How do I reduce rubber smell from new {k}?",
            "What causes {k} to crack, fade, or chip after heavy use?",
            "How long should quality {k} last in a commercial gym?",
        ],
    }
    for seed in SEED_KEYWORDS:
        for scenario, qs in scenarios.items():
            for q in qs:
                rows.append(
                    {
                        "query": q.format(k=seed),
                        "base_keyword": seed,
                        "scenario": scenario,
                        "intent_category": "B2B" if scenario in {"procurement", "pricing"} else "informational",
                        "source": "AI simulated query",
                        "collection_date": PYDATE,
                    }
                )
    return rows


def main():
    competitor_rows = []
    keyword_rows = []
    serp_urls_by_seed = {}

    for seed in SEED_KEYWORDS:
        urls, serp_source = google_serp(seed)
        serp_urls_by_seed[seed] = urls
        for rank, url in enumerate(urls, 1):
            page = parse_page(url)
            competitor_rows.append(
                {
                    "search_keyword": seed,
                    "rank": rank,
                    "serp_source_url": serp_source,
                    **page,
                    "collection_date": PYDATE,
                }
            )
            time.sleep(0.7)

        keyword_sources = []
        for q in [seed, f"{seed} wholesale", f"{seed} manufacturer", f"best {seed}", f"how to choose {seed}"]:
            keyword_sources.extend((term, "Google autocomplete", q) for term in google_suggest(q))
            time.sleep(0.25)
        keyword_sources.extend((term, "related search pattern", seed) for term in related_like_terms(seed))
        keyword_sources.extend((term, "people also ask", seed) for term in extract_questions_from_serp(seed))

        for term, source, source_query in keyword_sources:
            keyword_rows.append(
                {
                    "keyword": term,
                    "base_keyword": seed,
                    "intent_category": classify_keyword(term),
                    "source": source,
                    "source_query": source_query,
                    "collection_date": PYDATE,
                }
            )

    # Include SERP-derived page terms that often reveal commercial modifiers.
    for row in competitor_rows:
        for field in ["title", "h1", "h2", "meta_description", "image_alt"]:
            text = row.get(field, "")
            for phrase in re.split(r"[|,;:/()\[\]<>]+", text):
                phrase = clean_text(phrase)
                if 3 <= len(phrase.split()) <= 8 and any(seed.split()[0] in phrase.lower() for seed in SEED_KEYWORDS):
                    keyword_rows.append(
                        {
                            "keyword": phrase,
                            "base_keyword": row["search_keyword"],
                            "intent_category": classify_keyword(phrase),
                            "source": f"SERP page {field}",
                            "source_query": row["url"],
                            "collection_date": PYDATE,
                        }
                    )

    ai_rows = ai_queries()
    for row in ai_rows:
        keyword_rows.append(
            {
                "keyword": row["query"],
                "base_keyword": row["base_keyword"],
                "intent_category": row["intent_category"],
                "source": row["source"],
                "source_query": row["scenario"],
                "collection_date": PYDATE,
            }
        )

    deduped = {}
    for row in keyword_rows:
        key = row["keyword"].lower()
        if key not in deduped:
            deduped[key] = row
        elif deduped[key]["intent_category"] != "B2B" and row["intent_category"] == "B2B":
            deduped[key] = row
    keyword_rows = sorted(deduped.values(), key=lambda r: (r["base_keyword"], r["intent_category"], r["keyword"].lower()))

    write_csv(
        ROOT / "competitor_seo.csv",
        competitor_rows,
        [
            "search_keyword",
            "rank",
            "url",
            "final_url",
            "fetch_status",
            "title",
            "h1",
            "h2",
            "meta_description",
            "image_alt",
            "serp_source_url",
            "collection_date",
        ],
    )
    write_csv(
        ROOT / "keyword_master.csv",
        keyword_rows,
        ["keyword", "base_keyword", "intent_category", "source", "source_query", "collection_date"],
    )
    write_csv(
        ROOT / "ai_queries.csv",
        ai_rows,
        ["query", "base_keyword", "scenario", "intent_category", "source", "collection_date"],
    )

    stopwords = {
        "the",
        "and",
        "for",
        "with",
        "from",
        "are",
        "what",
        "how",
        "which",
        "best",
        "buy",
        "can",
        "you",
        "your",
        "near",
        "that",
        "when",
        "including",
        "should",
        "between",
        "versus",
    }
    words = []
    for row in keyword_rows:
        words.extend(
            w
            for w in re.findall(r"[a-zA-Z][a-zA-Z0-9+-]*", row["keyword"].lower())
            if len(w) > 2 and w not in stopwords
        )
    freq_rows = [{"word": word, "count": count} for word, count in Counter(words).most_common(50)]
    write_csv(ROOT / "top_50_word_frequency.csv", freq_rows, ["word", "count"])

    print(f"competitor_seo.csv rows: {len(competitor_rows)}")
    print(f"keyword_master.csv rows: {len(keyword_rows)}")
    print(f"ai_queries.csv rows: {len(ai_rows)}")
    print(f"top_50_word_frequency.csv rows: {len(freq_rows)}")


def write_csv(path, rows, fieldnames):
    with path.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


if __name__ == "__main__":
    main()
