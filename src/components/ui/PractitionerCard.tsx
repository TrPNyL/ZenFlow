"use client";

import Image from "next/image";

interface PractitionerCardProps {
  id: string;
  name: string;
  specialty: string;
  years_exp: number;
  rating: number;
  image_url?: string;
  certifications: string[];
  onViewAvailability?: (practitionerId: string) => void;
}

export function PractitionerCard({
  id,
  name,
  specialty,
  years_exp,
  rating,
  image_url,
  certifications,
  onViewAvailability,
}: PractitionerCardProps) {
  // Generate star rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-[var(--sage-dark)]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-[var(--sage-dark)]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id={`half-star-${id}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#e8e0d4" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-star-${id})`}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-[var(--cream-dark)]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="group relative bg-[var(--cream-light)] rounded-[2rem] p-6 shadow-[var(--shadow-md)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-[var(--shadow-soft)] hover:scale-[1.02]">
      {/* Profile Image with Sage Ring */}
      <div className="relative mx-auto mb-4 w-28 h-28">
        {/* Sage Green Ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-[var(--sage)] opacity-60 scale-110" />
        <div className="absolute inset-0 rounded-full border-[2px] border-[var(--sage-light)] opacity-40 scale-[1.2] animate-pulse" />
        
        {/* Image Container */}
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[var(--shadow-md)]">
          {image_url ? (
            <Image
              src={image_url}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--sage-light)] to-[var(--blush-light)] flex items-center justify-center">
              <span className="text-[var(--forest)] text-3xl font-[family-name:var(--font-heading)]">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Practitioner Info */}
      <div className="text-center">
        {/* Name */}
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-medium text-[var(--forest)] mb-1">
          {name}
        </h3>

        {/* Specialty */}
        <p className="text-[var(--sage-dark)] text-sm font-medium mb-2">
          {specialty}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-3">
          {renderStars(rating)}
          <span className="ml-1 text-sm text-[var(--forest-light)]">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Experience */}
        <p className="text-[var(--forest-light)] text-sm mb-4">
          {years_exp} years of experience
        </p>

        {/* Certifications Pills */}
        {certifications.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {certifications.slice(0, 2).map((cert, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs bg-[var(--sage-light)]/20 text-[var(--forest)] rounded-full"
              >
                {cert}
              </span>
            ))}
            {certifications.length > 2 && (
              <span className="px-2.5 py-1 text-xs bg-[var(--cream-dark)] text-[var(--forest-light)] rounded-full">
                +{certifications.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* View Availability Button */}
        <button
          onClick={() => onViewAvailability?.(id)}
          className="relative w-full py-2.5 px-4 rounded-xl font-medium text-sm text-[var(--forest)] bg-[var(--sage-light)]/20 overflow-hidden transition-all duration-300 hover:bg-[var(--sage)] hover:text-white group/btn"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            View Availability
          </span>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-8 h-8 opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-[var(--sage)] animate-leaf-sway">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
        </svg>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[var(--sage)] to-transparent opacity-30 rounded-full" />
    </div>
  );
}