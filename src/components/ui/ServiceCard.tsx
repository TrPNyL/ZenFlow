"use client";

import { useState } from "react";
import Image from "next/image";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  duration_mins: number;
  price: number;
  image_url?: string;
  benefits: string[];
  category: string;
  onBook?: (serviceId: string) => void;
}

export function ServiceCard({
  id,
  name,
  description,
  duration_mins,
  price,
  image_url,
  benefits,
  category,
  onBook,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="relative bg-[var(--cream-light)] rounded-[2rem] overflow-hidden shadow-[var(--shadow-md)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-[var(--shadow-soft)] hover:scale-[1.02] group"
      onMouseEnter={() => {
        setIsHovered(true);
        setShowBenefits(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setTimeout(() => setShowBenefits(false), 100);
      }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {image_url ? (
          <Image
            src={image_url}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--sage-light)] to-[var(--blush-light)] flex items-center justify-center">
            <span className="text-[var(--forest)] text-5xl opacity-30">✦</span>
          </div>
        )}
        {/* Warm Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-dark)]/30 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-[var(--cream-light)]/90 backdrop-blur-sm text-[var(--forest)] rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Service Name */}
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-medium text-[var(--forest)] mb-2">
          {name}
        </h3>

        {/* Description */}
        <p className="text-[var(--forest-light)] text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Duration & Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[var(--forest-light)] text-sm">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{duration_mins} mins</span>
          </div>
          <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[var(--forest)]">
            {formatPrice(price)}
          </span>
        </div>

        {/* Benefits - Animated Expand */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            showBenefits ? "max-h-40 opacity-100 mb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-2 border-t border-[var(--cream-dark)]">
            <p className="text-xs text-[var(--sage-dark)] uppercase tracking-wider mb-2">
              Benefits
            </p>
            <ul className="space-y-1">
              {benefits.slice(0, 3).map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-[var(--forest-light)]"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="w-1.5 h-1.5 bg-[var(--sage)] rounded-full flex-shrink-0" />
                  <span className="line-clamp-1">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Book Now CTA - Water Fill Effect */}
        <button
          onClick={() => onBook?.(id)}
          className="relative w-full py-3 px-6 rounded-xl font-medium text-[var(--forest)] border-2 border-[var(--sage)] overflow-hidden transition-colors duration-400 hover:text-white group/btn"
        >
          {/* Water Fill Background */}
          <span className="absolute inset-0 bg-[var(--sage)] transform translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/btn:translate-y-0" />
          
          {/* Button Text */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            Book Now
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </button>
      </div>

      {/* Decorative Leaf Corner */}
      <div className="absolute -bottom-2 -right-2 w-16 h-16 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-[var(--sage-dark)]">
          <path d="M50 100 C50 100 20 80 10 50 C0 20 20 0 50 0 C80 0 100 20 90 50 C80 80 50 100 50 100 Z" />
        </svg>
      </div>
    </div>
  );
}