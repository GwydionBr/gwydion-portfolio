import { Link, useLocation } from "@tanstack/react-router";
import { useMantineColorScheme } from "@mantine/core";
import { SunIcon, MoonIcon, GlobeIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import * as m from "../paraglide/messages";

const NAV_LINKS = [
  { href: "/", label: m.nav_home },
  { href: "/about", label: m.nav_about },
  { href: "/projects", label: m.nav_projects },
  { href: "/blog", label: m.nav_blog },
  { href: "/contact", label: m.nav_contact },
] as const;

interface HeaderProps {
  lang?: "en" | "de";
  onLangChange?: (lang: "en" | "de") => void;
}

export function Header({ lang = "en", onLangChange }: HeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isDark = mounted ? colorScheme === "dark" : true;

  return (
    <header
      className="site-header"
      data-scrolled={scrolled ? "" : undefined}
      data-menu-open={menuOpen ? "" : undefined}
    >
      {/* Logo */}
      <Link
        to="/"
        className="site-logo"
      >
        gwydion
        <span style={{ color: "var(--accent-gold)", marginLeft: 1 }}>.</span>
      </Link>

      {/* Nav + controls */}
      <nav id="site-navigation" className="site-nav" aria-label="Main navigation">
        {/* Links */}
        <div className="site-nav-links">
          {NAV_LINKS.map(({ href, label }) => {
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
                {label()}
              </Link>
            );
          })}
        </div>

        {/* Controls */}
        <div className="site-controls">
          <button
            type="button"
            onClick={() => onLangChange?.(lang === "en" ? "de" : "en")}
            aria-label={m.language_toggle()}
            className="icon-control language-control"
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
            aria-label={m.theme_toggle()}
            className="icon-control square-control"
          >
            {isDark ? (
              <SunIcon size={15} weight="light" />
            ) : (
              <MoonIcon size={15} weight="light" />
            )}
          </button>
        </div>
      </nav>

      <button
        type="button"
        className="icon-control square-control mobile-menu-button"
        aria-label={menuOpen ? m.menu_close() : m.menu_open()}
        aria-controls="site-navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <XIcon size={16} weight="light" /> : <ListIcon size={17} weight="light" />}
      </button>
    </header>
  );
}
