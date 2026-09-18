"use client";

import { motion, useReducedMotion } from "motion/react";

import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { TestimonialCard } from "./TestimonialCard";

type Testimonial = PageCopy["about"]["testimonials"]["items"][number];

type TestimonialGroupProps = {
  testimonials: Testimonial[];
};

export function TestimonialGroup({ testimonials }: TestimonialGroupProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="about__testimonialGroup"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: "easeOut" }}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.name} testimonial={testimonial} />
      ))}
    </motion.div>
  );
}
