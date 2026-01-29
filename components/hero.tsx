"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, MapPin, ArrowDown, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const Yoga3DScene = dynamic(() => import("./yoga-3d-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
  ),
});

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Badge animation
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      );

      // Title split animation
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { opacity: 0, y: 80, rotateX: -45 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.15 },
          "-=0.4"
        );
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

      // Buttons
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        );
      }

      // Stats
      if (statsRef.current) {
        tl.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.2"
        );
      }

      // Floating decorations
      gsap.to(".float-element", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToClasses = () => {
    document.getElementById("cours")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Yoga3DScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 z-[1]" />

      {/* Decorative elements */}
      <div ref={decorRef} className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="float-element absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-secondary/30 to-transparent blur-2xl" />
        <div className="float-element absolute top-[25%] right-[15%] w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
        <div className="float-element absolute bottom-[30%] left-[20%] w-24 h-24 rounded-full bg-gradient-to-br from-accent/25 to-transparent blur-xl" />
        <div className="float-element absolute bottom-[20%] right-[10%] w-36 h-36 rounded-full bg-gradient-to-br from-secondary/20 to-transparent blur-2xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/80 backdrop-blur-md border border-border/50 text-foreground text-sm font-medium mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            Bienvenue dans votre espace de bien-etre
          </span>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-foreground mb-8 leading-[1.1] perspective-1000"
          >
            <span className="word inline-block">Trouvez</span>{" "}
            <span className="word inline-block">votre</span>
            <br />
            <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">
              equilibre
            </span>{" "}
            <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-primary">
              interieur
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Explorez l'art du yoga a travers nos{" "}
            <span className="text-primary font-medium">cours en ligne</span> et{" "}
            <span className="text-accent font-medium">seances en studio</span>.
            Une experience unique pour tous les niveaux.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="group gap-3 px-8 py-7 text-base rounded-full shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            >
              <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary-foreground/20">
                <Play className="w-4 h-4 fill-current" />
              </span>
              Decouvrir les cours video
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group gap-3 px-8 py-7 text-base rounded-full backdrop-blur-md bg-card/60 border-border/50 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 hover:scale-105"
            >
              <MapPin className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
              Trouver un studio
            </Button>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: "150+", label: "Cours video", icon: "play" },
              { value: "5", label: "Studios", icon: "map" },
              { value: "10k+", label: "Yogis heureux", icon: "heart" },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative text-center p-5 md:p-6 rounded-3xl bg-card/70 backdrop-blur-md border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105 cursor-default"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="font-serif text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground mt-2 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToClasses}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
        >
          <span className="text-sm font-medium tracking-wide uppercase">
            Decouvrir
          </span>
          <div className="relative w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
          </div>
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
}
