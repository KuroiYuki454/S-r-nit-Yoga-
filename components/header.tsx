"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const navLinks = [
  { href: "#cours", label: "Nos Cours" },
  { href: "#formats", label: "Video & Salle" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Animate header on mount
    gsap.fromTo(
      ".header-content",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="header-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {/* Lotus icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 text-primary-foreground relative z-10"
                fill="currentColor"
              >
                <path d="M12 2C12 2 7 7 7 12C7 14.5 8.5 16.5 10.5 17.5C9.5 16 9 14 9 12C9 8 12 4 12 4C12 4 15 8 15 12C15 14 14.5 16 13.5 17.5C15.5 16.5 17 14.5 17 12C17 7 12 2 12 2Z" />
                <path d="M12 22C12 22 12 18 12 16C12 14 11 12 12 12C13 12 12 14 12 16C12 18 12 22 12 22Z" opacity="0.7" />
                <path d="M5 14C5 14 7 12 9 13C7 14 5 18 5 18C5 18 5 16 5 14Z" opacity="0.5" />
                <path d="M19 14C19 14 17 12 15 13C17 14 19 18 19 18C19 18 19 16 19 14Z" opacity="0.5" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl text-foreground font-semibold tracking-tight">
                Serenite
              </span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Yoga Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary hover:bg-primary/5"
            >
              Connexion
            </Button>
            <Button className="gap-2 rounded-full px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
              <Sparkles className="w-4 h-4" />
              Essai gratuit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute left-0 top-1 w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 top-3" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-5 w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                  isOpen ? "-rotate-45 top-3" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-6 border-t border-border/50">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all text-base font-medium"
                  onClick={() => setIsOpen(false)}
                  style={{
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-6 mt-4 border-t border-border/50">
              <Button
                variant="ghost"
                className="justify-start text-foreground hover:text-primary"
              >
                Connexion
              </Button>
              <Button className="gap-2 rounded-full bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/20">
                <Sparkles className="w-4 h-4" />
                Essai gratuit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
