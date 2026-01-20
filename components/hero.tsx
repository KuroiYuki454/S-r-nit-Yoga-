"use client";

import { Button } from "@/components/ui/button";
import { Play, MapPin, ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Yoga3DScene = dynamic(() => import("./yoga-3d-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
  ),
});

export function Hero() {
  const scrollToClasses = () => {
    document.getElementById("cours")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Yoga3DScene />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm text-secondary-foreground text-sm font-medium mb-6">
              Bienvenue chez Sérénité Yoga
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground mb-6 text-balance leading-tight"
          >
            Trouvez votre
            <span className="block text-primary">équilibre intérieur</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed"
          >
            Découvrez le yoga à votre rythme, en ligne depuis chez vous ou dans
            nos studios chaleureux. Des cours adaptés à tous les niveaux pour
            transformer votre bien-être.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="gap-2 px-8 py-6 text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <Play className="w-5 h-5" />
              Cours en vidéo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8 py-6 text-base rounded-full backdrop-blur-sm bg-card/50 hover:bg-card/80 transition-all"
            >
              <MapPin className="w-5 h-5" />
              Trouver un studio
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "150+", label: "Vidéos" },
              { value: "5", label: "Studios" },
              { value: "10k+", label: "Élèves" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50"
              >
                <div className="font-serif text-2xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToClasses}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <span className="text-sm">Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
