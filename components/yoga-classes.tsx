"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { ReservationModal } from "./reservation-modal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const yogaClasses = [
  {
    id: 1,
    name: "Hatha Yoga",
    description: "Un yoga doux et accessible, ideal pour les debutants. Focus sur la respiration et les postures fondamentales.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    duration: "60 min",
    level: "Debutant",
    participants: 234,
    category: "doux",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 2,
    name: "Vinyasa Flow",
    description: "Enchainements fluides et dynamiques synchronises avec la respiration pour un renforcement musculaire complet.",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop",
    duration: "75 min",
    level: "Intermediaire",
    participants: 189,
    category: "dynamique",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    id: 3,
    name: "Yin Yoga",
    description: "Postures tenues longuement pour relacher les tensions profondes et ameliorer la flexibilite.",
    image: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=600&h=400&fit=crop",
    duration: "90 min",
    level: "Tous niveaux",
    participants: 156,
    category: "doux",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: 4,
    name: "Power Yoga",
    description: "Une pratique intense et sportive pour developper force, endurance et concentration mentale.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
    duration: "60 min",
    level: "Avance",
    participants: 98,
    category: "dynamique",
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: 5,
    name: "Yoga Prenatal",
    description: "Adapte aux femmes enceintes pour accompagner les changements du corps en douceur.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    duration: "60 min",
    level: "Adapte",
    participants: 67,
    category: "special",
    color: "from-sky-500/20 to-cyan-500/20",
  },
  {
    id: 6,
    name: "Yoga Nidra",
    description: "Le yoga du sommeil conscient pour une relaxation profonde et une regeneration complete.",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&h=400&fit=crop",
    duration: "45 min",
    level: "Tous niveaux",
    participants: 201,
    category: "special",
    color: "from-indigo-500/20 to-blue-500/20",
  },
];

const filters = [
  { id: "all", label: "Tous les cours" },
  { id: "doux", label: "Yoga Doux" },
  { id: "dynamique", label: "Dynamique" },
  { id: "special", label: "Specialise" },
];

export function YogaClasses() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [reservationOpen, setReservationOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<typeof yogaClasses[0] | null>(null);
  
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

      // Cards stagger animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
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
  }, [activeFilter]);

  const handleReservation = (yogaClass: typeof yogaClasses[0]) => {
    setSelectedClass(yogaClass);
    setReservationOpen(true);
  };

  const filteredClasses = activeFilter === "all" 
    ? yogaClasses 
    : yogaClasses.filter(c => c.category === activeFilter);

  return (
    <section ref={sectionRef} id="cours" className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border/50 text-foreground text-sm font-medium mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            Nos Cours
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
            Explorez nos styles de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              yoga
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Du yoga doux au plus dynamique, trouvez le style qui vous correspond 
            et progressez a votre rythme avec nos professeurs certifies.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-card/80 border border-border/50 hover:border-primary/30"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((yogaClass) => (
            <Card 
              key={yogaClass.id} 
              className="group overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${yogaClass.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />
                <img
                  src={yogaClass.image || "/placeholder.svg"}
                  alt={yogaClass.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-4 py-1.5 rounded-full bg-card/95 backdrop-blur-md text-sm font-medium text-card-foreground shadow-lg">
                    {yogaClass.level}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="font-serif text-2xl text-white mb-1 drop-shadow-lg">
                    {yogaClass.name}
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">
                  {yogaClass.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{yogaClass.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
                    <Users className="w-4 h-4 text-accent" />
                    <span>{yogaClass.participants} eleves</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="ghost" 
                    className="flex-1 justify-between text-primary hover:text-primary hover:bg-primary/10 group/btn rounded-xl h-12"
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    onClick={() => handleReservation(yogaClass)}
                    className="gap-2 bg-primary hover:bg-primary/90 rounded-xl h-12 px-5 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Reserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ReservationModal 
        open={reservationOpen}
        onOpenChange={setReservationOpen}
        courseName={selectedClass?.name}
        courseType="studio"
      />
    </section>
  );
}
