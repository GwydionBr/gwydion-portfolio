import { Link, useLocation } from "@tanstack/react-router";
import { ActionIcon, Burger, Menu, Select, useMantineColorScheme } from "@mantine/core";
import {
  CheckIcon,
  DesktopIcon,
  GithubLogoIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { ReactCountryFlag } from "react-country-flag";
import type { Locale } from "#/app/i18n/LanguageContext";
import * as m from "#/generated/paraglide/messages";
import { GITHUB_PROFILE_URL } from "#/shared/config/links";

const NAV_LINKS = [
  { href: "/", label: m.nav_home },
  { href: "/about", label: m.nav_about },
  { href: "/projects", label: m.nav_projects },
  { href: "/blog", label: m.nav_blog },
  { href: "/contact", label: m.nav_contact },
] as const;

interface HeaderProps {
  lang?: Locale;
  onLangChange?: (lang: Locale) => void;
}

const LANGUAGE_OPTIONS: Array<{ value: Locale; label: string; countryCode: string; name: string }> = [
  { value: "en", label: "EN", countryCode: "GB", name: "English" },
  { value: "de", label: "DE", countryCode: "DE", name: "Deutsch" },
];

type ThemeChoice = "auto" | "light" | "dark";

export function Header({ lang = "en", onLangChange }: HeaderProps) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Avoids hydration mismatch when the client restores a stored scheme from localStorage.
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

  const resolvedScheme: ThemeChoice = mounted ? colorScheme : "auto";

  const themeOptions: Array<{
    value: ThemeChoice;
    label: () => string;
    icon: typeof SunIcon;
  }> = [
    { value: "auto", label: m.theme_system, icon: DesktopIcon },
    { value: "light", label: m.theme_toggle_light, icon: SunIcon },
    { value: "dark", label: m.theme_toggle_dark, icon: MoonIcon },
  ];

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
        Gwydion
        <span style={{ color: 'var(--mantine-color-gold-filled)', marginLeft: 1 }}>.</span>
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
          <Select<Locale>
            aria-label={m.language_toggle()}
            value={lang}
            data={LANGUAGE_OPTIONS.map(({ value, label }) => ({ value, label }))}
            allowDeselect={false}
            searchable={false}
            checkIconPosition="right"
            leftSection={<LanguageFlag locale={lang} />}
            leftSectionPointerEvents="none"
            className="language-select"
            classNames={{ input: "language-select-input", option: "language-select-option" }}
            comboboxProps={{ width: 126, position: "bottom-end" }}
            onChange={(value) => {
              if (value) {
                onLangChange?.(value);
              }
            }}
            renderOption={({ option }) => (
              <span className="language-select-option-content">
                <LanguageFlag locale={option.value as Locale} />
                <span>{getLanguageOption(option.value as Locale).name}</span>
              </span>
            )}
          />

          <ActionIcon
            component="a"
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="square-control"
            size={34}
            aria-label={m.header_github()}
          >
            <GithubLogoIcon size={17} weight="light" aria-hidden />
          </ActionIcon>

          <Menu
            position="bottom-end"
            offset={6}
            shadow="md"
            width={200}
            zIndex={10001}
            transitionProps={{
              transition: "pop",
              duration: 220,
              timingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Menu.Target>
              <ActionIcon
                type="button"
                aria-label={m.theme_choose()}
                aria-haspopup="menu"
                className="square-control"
                size={34}
              >
                <ThemeTriggerIcon scheme={resolvedScheme} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown className="theme-menu-dropdown">
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <Menu.Item
                  key={value}
                  leftSection={<Icon size={16} weight="light" aria-hidden />}
                  rightSection={
                    resolvedScheme === value ? (
                      <CheckIcon size={14} weight="bold" aria-hidden className="theme-menu-check" />
                    ) : (
                      <span style={{ width: 14 }} aria-hidden />
                    )
                  }
                  onClick={() => setColorScheme(value)}
                >
                  {label()}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </div>
      </nav>

      <Burger
        type="button"
        className="icon-control square-control mobile-menu-button"
        aria-label={menuOpen ? m.menu_close() : m.menu_open()}
        aria-controls="site-navigation"
        aria-expanded={menuOpen}
        opened={menuOpen}
        size="xs"
        color="var(--app-text-muted)"
        onClick={() => setMenuOpen((value) => !value)}
      />
    </header>
  );
}

function ThemeTriggerIcon({ scheme }: { scheme: ThemeChoice }) {
  const iconProps = { size: 15, weight: "light" as const };
  if (scheme === "auto") {
    return <DesktopIcon {...iconProps} />;
  }
  if (scheme === "light") {
    return <SunIcon {...iconProps} />;
  }
  return <MoonIcon {...iconProps} />;
}

function LanguageFlag({ locale }: { locale: Locale }) {
  const option = getLanguageOption(locale);

  return (
    <ReactCountryFlag
      countryCode={option.countryCode}
      svg
      title={option.name}
      aria-label={option.name}
      className="language-flag"
    />
  );
}

function getLanguageOption(locale: Locale) {
  return LANGUAGE_OPTIONS.find((option) => option.value === locale) ?? LANGUAGE_OPTIONS[0];
}
