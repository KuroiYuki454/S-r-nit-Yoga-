"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, MapPin, Check, Monitor, Calendar } from "lucide-react";
import { ReservationModal } from "./reservation-modal";

const videoFeatures = [
  "Accès illimité 24h/24",
  "Plus de 500 vidéos HD",
  "Nouveaux cours chaque semaine",
  "Programmes personnalisés",
  "Application mobile",
];

const studioFeatures = [
  "Cours en petit groupe",
  "Professeurs certifiés",
  "Équipement fourni",
  "Ambiance chaleureuse",
  "Planning flexible",
];

export function FormatsSection() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationType, setReservationType] = useState<"video" | "studio">("studio");

  const handleReservation = (type: "video" | "studio") => {
    setReservationType(type);
    setReservationOpen(true);
  };

  return (
    <section id="formats" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            Deux Formats
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            Pratiquez où vous voulez
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Choisissez le format qui s{"'"}adapte à votre vie : en ligne depuis chez vous ou en présentiel dans notre studio.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative bg-card rounded-3xl p-8 lg:p-10 border border-border h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                  <Monitor className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-card-foreground">Cours en Vidéo</h3>
                  <p className="text-muted-foreground">Pratiquez à votre rythme</p>
                </div>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
                <img
                  src="https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&h=450&fit=crop"
                  alt="Cours de yoga en ligne"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-card flex items-center justify-center hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-primary ml-1" />
                  </button>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {videoFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-card-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                onClick={() => handleReservation("video")}
              >
                <Play className="w-5 h-5" />
                Commencer en ligne
              </Button>
            </div>
          </div>

          {/* Studio Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative bg-card rounded-3xl p-8 lg:p-10 border border-border h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-card-foreground">Cours en Salle</h3>
                  <p className="text-muted-foreground">Vivez l{"'"}expérience en studio</p>
                </div>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop"
                  alt="Studio de yoga"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-card-foreground">Prochain cours</p>
                      <p className="text-sm text-muted-foreground">Vinyasa Flow • 18h00</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm">
                      5 places
                    </span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {studioFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-card-foreground">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                onClick={() => handleReservation("studio")}
              >
                <Calendar className="w-5 h-5" />
                Réserver un cours
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
