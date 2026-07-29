import type { ElementType, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

function Section({
  children,
  className = "",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
    </Tag>
  );
}

export { Section };
