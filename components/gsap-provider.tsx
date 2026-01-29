"use client";

import React from "react"

import { useEffect, useRef, createContext, useContext, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GSAPContext = createContext<typeof gsap | null>(null);

export function useGSAP() {
  return useContext(GSAPContext);
}

export function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Smooth scroll effect
    const sections = document.querySelectorAll("section");
    
    sections.forEach((section) => {
      // Fade in sections on scroll
      gsap.fromTo(
        section,
        {
          opacity: 0.3,
        },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    });

    // Parallax effect for elements with data-speed attribute
    document.querySelectorAll("[data-speed]").forEach((el) => {
      const speed = parseFloat((el as HTMLElement).dataset.speed || "0.5");
      gsap.to(el, {
        y: () => (1 - speed) * ScrollTrigger.maxScroll(window) * 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <GSAPContext.Provider value={gsap}>{children}</GSAPContext.Provider>;
}

// Hook for scroll-triggered animations
export function useScrollAnimation(
  ref: React.RefObject<HTMLElement | null>,
  animation: "fadeUp" | "fadeIn" | "scaleUp" | "slideLeft" | "slideRight" | "stagger",
  options?: {
    delay?: number;
    duration?: number;
    staggerDelay?: number;
  }
) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { delay = 0, duration = 1, staggerDelay = 0.1 } = options || {};

    let tl: gsap.core.Timeline;

    switch (animation) {
      case "fadeUp":
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        tl.fromTo(
          element,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration, delay, ease: "power3.out" }
        );
        break;

      case "fadeIn":
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        tl.fromTo(
          element,
          { opacity: 0 },
          { opacity: 1, duration, delay, ease: "power2.out" }
        );
        break;

      case "scaleUp":
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        tl.fromTo(
          element,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration, delay, ease: "back.out(1.7)" }
        );
        break;

      case "slideLeft":
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        tl.fromTo(
          element,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration, delay, ease: "power3.out" }
        );
        break;

      case "slideRight":
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        tl.fromTo(
          element,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration, delay, ease: "power3.out" }
        );
        break;

      case "stagger":
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        tl.fromTo(
          element.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger: staggerDelay,
            ease: "power3.out",
          }
        );
        break;
    }

    return () => {
      tl?.kill();
    };
  }, [ref, animation, options]);
}
