'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './header.module.css';

const Header = () => {
   const [theme, setTheme] = useState<"light" | "dark">(() => {
     if (typeof window === "undefined") {
       return "light";
     }

     const stored = localStorage.getItem("theme");
     if (
       stored === "dark" ||
       (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
     ) {
       return "dark";
     }
     return "light";
   });

   useEffect(() => {
     if (theme === "dark") {
       document.documentElement.setAttribute("data-theme", "dark");
     } else {
       document.documentElement.removeAttribute("data-theme");
     }
     localStorage.setItem("theme", theme);
   }, [theme]);

   const toggleTheme = () => {
     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
   };
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-check-square"
            width="24"
            height="24"
          >
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          TaskBoard
        </div>
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
}
export default Header