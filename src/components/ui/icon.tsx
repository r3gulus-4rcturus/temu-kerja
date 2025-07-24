import React from "react";

interface Props {
  className: any;
  icon: JSX.Element;
  size: "lg" | "md" | "sm";
}

export const Icon = ({ className, icon, size }: Props): JSX.Element => {
  return (
    <div
      className={`inline-flex items-center justify-center gap-2.5 relative ${className}`}
    >
      {React.cloneElement(icon, {
        className: `!relative ${
          size === "sm"
            ? "!w-4 !h-4"
            : size === "md"
            ? "!w-5 !h-5"
            : "!w-6 !h-6"
        }`,
      })}
    </div>
  );
};