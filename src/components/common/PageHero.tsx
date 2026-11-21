import React from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  text: string;
  icon?: React.ReactNode;
}

export function PageHero({ eyebrow, title, text, icon }: PageHeroProps) {
  return (
    <section className="subpage-hero">
      <div className="site-container text-center">
        {eyebrow && (
          <div className="eyebrow mx-auto mb-4">
            {icon}
            <span>{eyebrow}</span>
          </div>
        )}

       <h1 className="page-hero-title">
  {title.split(" ").map((word, index) => (
    <span
      key={index}
      className="page-hero-word"
      style={{ animationDelay: `${index * 180}ms` }}
    >
      {word}
    </span>
  ))}
</h1>

        <p>{text}</p>
      </div>
    </section>
  );
}