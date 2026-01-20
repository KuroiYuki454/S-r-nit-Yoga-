import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Découverte",
    price: "29",
    period: "/mois",
    description: "Parfait pour débuter votre pratique",
    features: [
      "Accès aux cours vidéo de base",
      "10 vidéos par mois",
      "Support par email",
      "Application mobile",
    ],
    cta: "Commencer",
    popular: false,
  },
  {
    name: "Illimité",
    price: "49",
    period: "/mois",
    description: "Pour une pratique régulière et complète",
    features: [
      "Accès illimité aux vidéos",
      "Tous les styles de yoga",
      "Programmes personnalisés",
      "Cours live hebdomadaires",
      "Téléchargement hors-ligne",
    ],
    cta: "Essai gratuit 7 jours",
    popular: true,
  },
  {
    name: "Studio",
    price: "89",
    period: "/mois",
    description: "L'expérience complète vidéo + salle",
    features: [
      "Tout l'abonnement Illimité",
      "4 cours en salle par mois",
      "Accès prioritaire aux événements",
      "Réductions sur les ateliers",
      "Coach personnel",
    ],
    cta: "Nous contacter",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="tarifs" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Tarifs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            Choisissez votre formule
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Des formules flexibles adaptées à vos besoins. Sans engagement, annulable à tout moment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative overflow-hidden ${
                plan.popular 
                  ? "border-primary shadow-xl scale-105 bg-card" 
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-sm font-medium rounded-bl-xl flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Populaire
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <h3 className="font-serif text-xl text-card-foreground">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-serif text-card-foreground">{plan.price}€</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-card-foreground text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? "bg-primary/20" : "bg-accent/20"
                      }`}>
                        <Check className={`w-3 h-3 ${plan.popular ? "text-primary" : "text-accent"}`} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
