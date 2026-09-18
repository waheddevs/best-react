"use client";

import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { TestimonialGroup } from "./TestimonialGroup";

type TestimonialsProps = {
  copy: PageCopy;
};

export function Testimonials({ copy }: TestimonialsProps) {
  /* HOOKS */
  const sectionRef = useRef<HTMLElement>(null);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextGroupIndex = progress < 1 / 3 ? 0 : progress < 2 / 3 ? 1 : 2;
    setActiveGroupIndex((current) => (current === nextGroupIndex ? current : nextGroupIndex));
  });

  const items = copy.about.testimonials.items;
  const groups = [items.slice(0, 3), items.slice(3, 6), items.slice(6, 9)];
  const activeTestimonials = groups[activeGroupIndex] ?? groups[0];

  return (
    <section ref={sectionRef} className="about__testimonials">
      <Container className="about__testimonialsSticky">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={copy.about.testimonials.eyebrow}
            title={copy.about.testimonials.title}
          />
        </Reveal>

        <div className="about__testimonialStage">
          <AnimatePresence initial={false} mode="wait">
            <TestimonialGroup key={activeGroupIndex} testimonials={activeTestimonials} />
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
