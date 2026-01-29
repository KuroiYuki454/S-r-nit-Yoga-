"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, MapPin, Check, Monitor, Calendar, Sparkles } from "lucide-react";
import { ReservationModal } from "./reservation-modal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videoFeatures = [
  "Acces illimite 24h/24",
  "Plus de 500 videos HD",
  "Nouveaux cours chaque semaine",
  "Programmes personnalises",
  "Application mobile",
];

const studioFeatures = [
  "Cours en petit groupe",
  "Professeurs certifies",
  "Equipement fourni",
  "Ambiance chaleureuse",
  "Planning flexible",
];

export function FormatsSection() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationType, setReservationType] = useState<"video" | "studio">("studio");
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const studioCardRef = useRef<HTMLDivElement>(null);

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

      // Video card slide from left
      gsap.fromTo(
        videoCardRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoCardRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Studio card slide from right
      gsap.fromTo(
        studioCardRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: studioCardRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleReservation = (type: "video" | "studio") => {
    setReservationType(type);
    setReservationOpen(true);
  };

  return (
    <section ref={sectionRef} id="formats" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 -translate-x-1/2 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/2 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border/50 text-foreground text-sm font-medium mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            Deux Formats
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
            Pratiquez{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              ou vous voulez
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Choisissez le format qui s'adapte a votre vie : en ligne depuis chez vous 
            ou en presentiel dans notre studio.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Video Section */}
          <div ref={videoCardRef} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-[2rem] transform group-hover:scale-[1.02] transition-transform duration-500" />
            <div className="relative bg-card/80 backdrop-blur-sm rounded-[2rem] p-8 lg:p-10 border border-border/50 h-full hover:border-primary/30 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
                  <Monitor className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-card-foreground">Cours en Video</h3>
                  <p className="text-muted-foreground">Pratiquez a votre rythme</p>
                </div>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 group/video">
                <img
                  src="https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&h=450&fit=crop"
                  alt="Cours de yoga en ligne"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-card/95 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform shadow-xl group/play">
                    <Play className="w-8 h-8 text-primary ml-1 group-hover/play:scale-110 transition-transform" />
                  </div>
                </button>
                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
                  500+ videos disponibles
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {videoFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-4 text-card-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground gap-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all text-base"
                onClick={() => handleReservation("video")}
              >
                <Play className="w-5 h-5" />
                Commencer en ligne
              </Button>
            </div>
          </div>

          {/* Studio Section */}
          <div ref={studioCardRef} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent rounded-[2rem] transform group-hover:scale-[1.02] transition-transform duration-500" />
            <div className="relative bg-card/80 backdrop-blur-sm rounded-[2rem] p-8 lg:p-10 border border-border/50 h-full hover:border-accent/30 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/25">
                  <MapPin className="w-8 h-8 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-card-foreground">Cours en Salle</h3>
                  <p className="text-muted-foreground">Vivez l'experience en studio</p>
                </div>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 group/studio">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop"
                  alt="Studio de yoga"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/studio:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-md rounded-xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-card-foreground">Prochain cours</p>
                      <p className="text-sm text-muted-foreground">Vinyasa Flow - 18h00</p>
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium shadow-lg">
                      5 places
                    </span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {studioFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-4 text-card-foreground">
                    <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground gap-3 rounded-xl shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all text-base"
                onClick={() => handleReservation("studio")}
              >
                <Calendar className="w-5 h-5" />
                Reserver un cours
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ReservationModal 
        open={reservationOpen}
        onOpenChange={setReservationOpen}
        courseName={reservationType === "video" ? "Cours en Ligne" : "Cours en Studio"}
        courseType={reservationType}
      />
    </section>
  );
}
