import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { FC } from "react";

const NAV_ITEMS: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/prompts", label: "Prompts" },
  { path: "/learn", label: "Tutorials" },
  { path: "/videos", label: "Videos" },
  { path: "/resources", label: "Resources" },
];

const CTA_BUTTON_CLASS =
  "hidden lg:inline-flex bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 md:px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-slate-200 dark:shadow-none";

const Header: FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) =>
    path === "/learn"
      ? location.pathname === "/learn" ||
        location.pathname.startsWith("/learn/")
      : location.pathname === path;

  const navLinkClass = (path: string) =>
    isActive(path)
      ? "px-4 py-1.5 text-sm font-medium bg-white dark:bg-slate-700 shadow-sm rounded-full text-primary"
      : "px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors";

  const mobileLinkClass = (path: string) =>
    isActive(path)
      ? "block py-3 px-4 text-sm font-medium text-primary bg-primary/10 dark:bg-primary/20"
      : "block py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl font-extrabold tracking-tight text-primary">
              Ai made
            </span>
            <span className="text-2xl font-medium text-slate-400">helpful</span>
          </Link>
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-2 py-1 space-x-1 flex-shrink-0">
            {NAV_ITEMS.map(({ path, label }) => (
              <Link key={path} to={path} className={navLinkClass(path)}>
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center flex-shrink-0 gap-2">
            <Link to="/contact" className={CTA_BUTTON_CLASS}>
              Contact Us
            </Link>
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="material-icons-outlined">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile dropdown panel */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg z-40 max-h-[70vh] overflow-y-auto"
          aria-hidden="false"
        >
          <div className="px-4 py-2">
            {NAV_ITEMS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={mobileLinkClass(path)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              className={mobileLinkClass("/contact")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
