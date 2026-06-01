import React from "react";

interface SectionHeadingProps {
  title?: string;
  subTitle?: string;
}

export default function SectionHeading({
  title,
  subTitle,
}: SectionHeadingProps) {
  if (!title && !subTitle) return null;

  return (
    <div className="space-y-1.5 mb-6">
      {title && (
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-custom-text-primary">
          {title}
        </h1>
      )}
      {subTitle && (
        <p className="text-sm font-medium text-custom-text-secondary">
          {subTitle}
        </p>
      )}
    </div>
  );
}
