"use client";
import { useQuery } from "@apollo/client/react";
import Image, { type ImageProps } from "next/image";
import { PublicEventCoverDocument } from "@/gql/graphql";

/** Resolve expiring cover links independently of cached public page content. */
export function EventImage({
  eventId,
  uploaded,
  src,
  alt,
  ...props
}: ImageProps & { eventId?: string; uploaded: boolean }) {
  const { data } = useQuery(PublicEventCoverDocument, {
    variables: { eventId: eventId ?? "" },
    skip: !uploaded || !eventId,
    fetchPolicy: "network-only",
  });
  const image = uploaded ? data?.publicEventCover?.url : src;
  return image ? <Image {...props} src={image} alt={alt} unoptimized={uploaded} /> : null;
}
