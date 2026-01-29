"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  cours: [
    { label: "Hatha Yoga", href: "#" },
    { label: "Vinyasa Flow", href: "#" },
    { label: "Yin Yoga", href: "#" },
    { label: "Power Yoga", href: "#" },
  ],
  ressources: [
    { label: "Blog", href: "#" },
    { label: "Guides gratuits", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Evenements", href: "#" },
  ],
  legal: [
    { label: "Mentions legales", href: "#" },
    { label: "CGV", href: "#" },
    { label: "Confidentialite", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="relative bg-foreground text-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2" />

      <div ref={contentRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="group flex items-center gap-3 mb-8">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-primary-foreground relative z-10"
                  fill="currentColor"
                >
                  <path d="M12 2C12 2 7 7 7 12C7 14.5 8.5 16.5 10.5 17.5C9.5 16 9 14 9 12C9 8 12 4 12 4C12 4 15 8 15 12C15 14 14.5 16 13.5 17.5C15.5 16.5 17 14.5 17 12C17 7 12 2 12 2Z" />
                  <path d="M12 22C12 22 12 18 12 16C12 14 11 12 12 12C13 12 12 14 12 16C12 18 12 22 12 22Z" opacity="0.7" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl text-background font-semibold">Serenite</span>
                <span className="text-xs text-background/50 tracking-widest uppercase">Yoga Studio</span>
              </div>
            </Link>
            
            <p className="text-background/60 mb-8 max-w-sm leading-relaxed">
              Votre espace de bien-etre en ligne et en salle. Rejoignez notre communaute 
              et transformez votre quotidien par le yoga.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-background/60">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">123 Rue de la Paix, 75001 Paris</span>
              </div>
              <div className="flex items-center gap-3 text-background/60">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+33 1 23 45 67 89</span>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-105 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-background" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg text-background mb-6">Nos Cours</h4>
            <ul className="space-y-4">
              {footerLinks.cours.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-background/60 hover:text-primary transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-background mb-6">Ressources</h4>
            <ul className="space-y-4">
              {footerLinks.ressources.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-background/60 hover:text-primary transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg text-background mb-6">Newsletter</h4>
            <p className="text-background/60 text-sm mb-6 leading-relaxed">
              Recevez nos conseils bien-etre et offres exclusives directement dans votre boite mail.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/40 text-sm focus:outline-none focus:border-primary/50 focus:bg-background/15 transition-all"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-xl h-12 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Mail className="w-4 h-4" />
                S'inscrire
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-background/40 text-sm flex items-center gap-2">
            2026 Serenite Yoga. Fait avec <Heart className="w-4 h-4 text-accent fill-accent" /> a Paris
          </p>
          <div className="flex items-center flex-wrap justify-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-background/40 hover:text-background transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
