"use client";

import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import { PublicCourseCoverDocument } from "@/gql/graphql";

/** Request short-lived image URLs in the browser so cached pages never embed expired links. */
export function CourseImage({
  courseId,
  uploaded,
  src,
  alt,
  className,
  sizes,
  priority = false,
  courseSlug,
}: {
  courseId?: string;
  uploaded: boolean;
  src?: string;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
  courseSlug?: string;
}) {
  const { data } = useQuery(PublicCourseCoverDocument, {
    variables: { courseId: courseId ?? "" },
    skip: !uploaded || !courseId,
    fetchPolicy: "network-only",
  });
  const image = uploaded ? data?.publicCourseCover?.url : src;
  return image ? (
    <Image
      src={image}
      alt={alt}
      className={className}
      fill
      sizes={sizes}
      preload={priority}
      unoptimized={uploaded}
      data-course={courseSlug}
    />
  ) : null;
}
