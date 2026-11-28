import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section" lang="en" dir="ltr">
      <div className="section-heading">
        <p>PowerBaseFit</p>
        <h1>Page not found</h1>
        <p>Explore our free-weight equipment or contact us for help finding what you need.</p>
        <p><Link className="button" href="/products">Browse products</Link> · <Link href="/contact">Contact PowerBaseFit</Link></p>
      </div>
    </main>
  );
}
