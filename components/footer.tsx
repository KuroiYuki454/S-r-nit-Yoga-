import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    { label: "Événements", href: "#" },
  ],
  legal: [
    { label: "Mentions légales", href: "#" },
    { label: "CGV", href: "#" },
    { label: "Confidentialité", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-xl">S</span>
              </div>
              <span className="font-serif text-2xl text-background">
                Sérénité Yoga
              </span>
            </Link>
            <p className="text-background/70 mb-6 max-w-sm">
              Votre espace de bien-être en ligne et en salle. Rejoignez notre communauté et transformez votre quotidien par le yoga.
            </p>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-background" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-background mb-4">Nos Cours</h4>
            <ul className="space-y-3">
              {footerLinks.cours.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-background mb-4">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-background mb-4">Newsletter</h4>
            <p className="text-background/70 text-sm mb-4">
              Recevez nos conseils et offres exclusives.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 text-sm focus:outline-none focus:border-background/40"
              />
              <Button size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © 2026 Sérénité Yoga. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-background/60 hover:text-background transition-colors text-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
