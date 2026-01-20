"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Flame, Users, ArrowRight } from "lucide-react";

const yogaClasses = [
  {
    id: 1,
    name: "Hatha Yoga",
    description: "Un yoga doux et accessible, idéal pour les débutants. Focus sur la respiration et les postures fondamentales.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    duration: "60 min",
    level: "Débutant",
    participants: 234,
    category: "doux",
  },
  {
    id: 2,
    name: "Vinyasa Flow",
    description: "Enchaînements fluides et dynamiques synchronisés avec la respiration pour un renforcement musculaire complet.",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop",
    duration: "75 min",
    level: "Intermédiaire",
    participants: 189,
    category: "dynamique",
  },
  {
    id: 3,
    name: "Yin Yoga",
    description: "Postures tenues longuement pour relâcher les tensions profondes et améliorer la flexibilité.",
    image: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=600&h=400&fit=crop",
    duration: "90 min",
    level: "Tous niveaux",
    participants: 156,
    category: "doux",
  },
  {
    id: 4,
    name: "Power Yoga",
    description: "Une pratique intense et sportive pour développer force, endurance et concentration mentale.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
    duration: "60 min",
    level: "Avancé",
    participants: 98,
    category: "dynamique",
  },
  {
    id: 5,
    name: "Yoga Prénatal",
    description: "Adapté aux femmes enceintes pour accompagner les changements du corps en douceur.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    duration: "60 min",
    level: "Adapté",
    participants: 67,
    category: "special",
  },
  {
    id: 6,
    name: "Yoga Nidra",
    description: "Le yoga du sommeil conscient pour une relaxation profonde et une régénération complète.",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&h=400&fit=crop",
    duration: "45 min",
    level: "Tous niveaux",
    participants: 201,
    category: "special",
  },
];

const filters = [
  { id: "all", label: "Tous" },
  { id: "doux", label: "Yoga Doux" },
  { id: "dynamique", label: "Dynamique" },
  { id: "special", label: "Spécialisé" },
];

export function YogaClasses() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredClasses = activeFilter === "all" 
    ? yogaClasses 
    : yogaClasses.filter(c => c.category === activeFilter);

  return (
    <section id="cours" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Nos Cours
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            Explorez nos styles de yoga
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Du yoga doux au plus dynamique, trouvez le style qui vous correspond et progressez à votre rythme.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-secondary hover:text-secondary-foreground border border-border"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((yogaClass) => (
            <Card key={yogaClass.id} className="overflow-hidden group hover:shadow-lg transition-shadow bg-card border-border">
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={yogaClass.image || "/placeholder.svg"}
                  alt={yogaClass.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-sm font-medium text-card-foreground">
                    {yogaClass.level}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl text-card-foreground mb-2">{yogaClass.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {yogaClass.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{yogaClass.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{yogaClass.participants} élèves</span>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between text-primary hover:text-primary hover:bg-secondary group/btn">
                  Découvrir
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
