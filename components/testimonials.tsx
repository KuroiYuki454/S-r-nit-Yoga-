"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Marie L.",
    role: "Pratiquante depuis 2 ans",
    content: "Les cours en video m'ont permis de pratiquer regulierement malgre mon emploi du temps charge. La qualite des enseignements est exceptionnelle.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    name: "Thomas D.",
    role: "Eleve debutant",
    content: "J'ai commence par les cours en ligne puis j'ai decouvert le studio. L'ambiance est incroyable et les professeurs vraiment a l'ecoute.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophie M.",
    role: "Professeure de yoga",
    content: "En tant que professeure, je recommande souvent cette plateforme a mes eleves. La pedagogie est claire et progressive.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border/50 text-foreground text-sm font-medium mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            Temoignages
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
            Ce que disent nos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              eleves
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Decouvrez les experiences de notre communaute de yogis
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="group relative bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
            >
              {/* Quote decoration */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-primary" />
              </div>

              <CardContent className="relative p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-card-foreground mb-8 leading-relaxed text-base">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
