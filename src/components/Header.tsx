import { Link, useLocation } from "@tanstack/react-router";
import { useMantineColorScheme } from "@mantine/core";
import { SunIcon, MoonIcon, GlobeIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/", en: "Home", de: "Start" },
  { href: "/about", en: "About", de: "Über mich" },
  { href: "/projects", en: "Projects", de: "Projekte" },
  { href: "/blog", en: "Blog", de: "Blog" },
  { href: "/contact", en: "Contact", de: "Kontakt" },
] as const;

interface HeaderProps {
  lang?: "en" | "de";
  onLangChange?: (lang: "en" | "de") => void;
}

export function Header({ lang = "en", onLangChange }: HeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  // mounted prevents SSR/client hydration mismatch for color-scheme-dependent icons.
  // Before mount: always render as "dark" (matches defaultColorScheme="dark" on server).
  // After mount: use the real value from localStorage.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isDark = mounted ? colorScheme === "dark" : true;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        transition:
          "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
        background: scrolled
          ? isDark
            ? "rgba(12, 18, 16, 0.82)"
            : "rgba(243, 239, 228, 0.86)"
          : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(180%)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.45rem",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: "var(--text-primary)",
          textDecoration: "none",
          userSelect: "none",
        }}
      >
        gwydion
        <span style={{ color: "var(--accent-gold)", marginLeft: 1 }}>.</span>
      </Link>

      {/* Nav + controls */}
      <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {/* Links */}
        <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
          {NAV_LINKS.map(({ href, en, de }) => {
            const isActive =
              href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(href);
            return (
              <Link
                key={href}
                to={href}
                className="nav-link"
                data-active={isActive ? "" : undefined}
                style={{ textDecoration: "none" }}
              >
                {lang === "de" ? de : en}
              </Link>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            type="button"
            onClick={() => onLangChange?.(lang === "en" ? "de" : "en")}
            aria-label="Toggle language"
            style={ctrlStyle}
          >
            <GlobeIcon size={13} weight="light" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
              }}
            >
              {lang.toUpperCase()}
            </span>
          </button>

          <button
            type="button"
            onClick={() => toggleColorScheme()}
            aria-label="Toggle color scheme"
            style={{ ...ctrlStyle, width: 34, padding: "0" }}
          >
            {isDark ? (
              <SunIcon size={15} weight="light" />
            ) : (
              <MoonIcon size={15} weight="light" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

const ctrlStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 5,
  height: 34,
  padding: "0 10px",
  background: "none",
  border: "1px solid var(--border)",
  borderRadius: 8,
  cursor: "pointer",
  color: "var(--text-muted)",
  transition: "color 0.2s, border-color 0.2s",
};
