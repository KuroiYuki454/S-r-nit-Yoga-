"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Star, Sparkles, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Decouverte",
    price: "29",
    period: "/mois",
    description: "Parfait pour debuter votre pratique",
    features: [
      "Acces aux cours video de base",
      "10 videos par mois",
      "Support par email",
      "Application mobile",
    ],
    cta: "Commencer",
    popular: false,
    icon: Sparkles,
  },
  {
    name: "Illimite",
    price: "49",
    period: "/mois",
    description: "Pour une pratique reguliere et complete",
    features: [
      "Acces illimite aux videos",
      "Tous les styles de yoga",
      "Programmes personnalises",
      "Cours live hebdomadaires",
      "Telechargement hors-ligne",
    ],
    cta: "Essai gratuit 7 jours",
    popular: true,
    icon: Zap,
  },
  {
    name: "Studio",
    price: "89",
    period: "/mois",
    description: "L'experience complete video + salle",
    features: [
      "Tout l'abonnement Illimite",
      "4 cours en salle par mois",
      "Acces prioritaire aux evenements",
      "Reductions sur les ateliers",
      "Coach personnel",
    ],
    cta: "Nous contacter",
    popular: false,
    icon: Star,
  },
];

export function PricingSection() {
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

      // Cards stagger with scale
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)",
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
    <section ref={sectionRef} id="tarifs" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border/50 text-foreground text-sm font-medium mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            Tarifs
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
            Choisissez votre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              formule
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Des formules flexibles adaptees a vos besoins. Sans engagement, annulable a tout moment.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                plan.popular 
                  ? "border-primary/50 shadow-xl shadow-primary/10 bg-card scale-105 z-10" 
                  : "border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 hover:shadow-primary/5"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              )}
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1.5 text-sm font-medium rounded-full flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Populaire
                </div>
              )}

              <CardHeader className="text-center pt-10 pb-6">
                {/* Icon */}
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  plan.popular 
                    ? "bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25" 
                    : "bg-muted"
                }`}>
                  <plan.icon className={`w-7 h-7 ${plan.popular ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </div>

                <h3 className="font-serif text-2xl text-card-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-5xl font-serif font-bold text-card-foreground">{plan.price}</span>
                  <span className="text-lg text-muted-foreground ml-1">EUR{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-2 pb-10">
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-card-foreground">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? "bg-primary/15" : "bg-accent/15"
                      }`}>
                        <Check className={`w-3.5 h-3.5 ${plan.popular ? "text-primary" : "text-accent"}`} />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  size="lg"
                  className={`w-full h-14 rounded-xl transition-all duration-300 text-base ${
                    plan.popular 
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30" 
                      : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            Sans engagement
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            Paiement securise
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            Satisfait ou rembourse
          </div>
        </div>
      </div>
    </section>
  );
}
