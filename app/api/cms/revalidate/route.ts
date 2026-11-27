import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { cmsCategories, cmsTag } from "../../../../lib/content/wordpress";

export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  const signature = request.headers.get("x-cfw-signature");
  if (!secret || !signature || !/^[a-f0-9]{64}$/.test(signature)) {
    return new Response(null, { status: 401 });
  }
  const raw = await request.text();
  if (raw.length > 512) return new Response(null, { status: 413 });

  const expected = createHmac("sha256", secret).update(raw).digest();
  if (!timingSafeEqual(expected, Buffer.from(signature, "hex"))) {
    return new Response(null, { status: 401 });
  }
  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400 });
  }
  const { kind, timestamp } = event ?? {};
  if ((kind !== "articles" && kind !== "products") || !Number.isInteger(timestamp)
      || Math.abs(Date.now() / 1000 - timestamp) > 300) {
    return new Response(null, { status: 400 });
  }

  revalidateTag(cmsTag(kind));
  if (kind === "articles") {
    revalidatePath("/resources");
    revalidatePath("/resources/[slug]", "page");
    revalidatePath("/sitemaps/blogs.xml");
  } else {
    revalidatePath("/products");
    for (const category of cmsCategories) {
      revalidatePath(`/products/${category}`);
      revalidatePath(`/products/${category}/[slug]`, "page");
    }
    revalidatePath("/sitemaps/products.xml");
  }
  return Response.json({ revalidated: true });
}
