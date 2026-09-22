import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd, breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";

export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={secondary ? "button button-secondary" : "button"} href={href}>
      {children}
      <ArrowRight aria-hidden="true" size={17} />
    </Link>
  );
}
export function Facts({
  items,
  label,
}: {
  items: { value: string | number; label: string }[];
  label?: string;
}) {
  return (
    <div className="facts" aria-label={label}>
      {items.map((item) => (
        <div className="fact" key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Breadcrumbs({ items, label }: { items: BreadcrumbItem[]; label: string }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav className="breadcrumbs" aria-label={label}>
        <ol>
          {items.map((item, index) => (
            <li key={item.path}>
              {index === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="source-link" href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowRight aria-hidden="true" size={14} />
    </a>
  );
}
