"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "@/content/site";
import { Brand } from "./brand";

type MobileLink = { href: string; label: string };

export function MobileMenu({
  lang,
  label,
  closeLabel,
  links,
}: {
  lang: Lang;
  label: string;
  closeLabel: string;
  links: MobileLink[];
}) {
  const [open, setOpen] = useState(false);
  const dialogId = useId();
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const openButton = openButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      openButton?.focus();
    };
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        ref={openButtonRef}
        type="button"
        className="mobile-menu-trigger"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden="true" size={19} />
        <span>{label}</span>
      </button>
      {open && (
        <div
          ref={panelRef}
          id={dialogId}
          className="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <div className="mobile-menu-head">
            <Brand lang={lang} />
            <button
              ref={closeButtonRef}
              type="button"
              className="mobile-menu-close"
              onClick={() => setOpen(false)}
            >
              <X aria-hidden="true" size={22} />
              <span className="sr-only">{closeLabel}</span>
            </button>
          </div>
          <nav aria-label={label}>
            {links.map((link) => (
              <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
