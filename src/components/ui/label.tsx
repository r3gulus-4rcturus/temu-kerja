import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<"label">,
  React.ComponentPropsWithoutRef<"label"> & {
    divClassName?: string;
    label?: string;
    showAsterisk?: boolean;
    size?: "lg" | "md" | "sm";
  }
>(({ className, divClassName, label, showAsterisk, size, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(labelVariants(), className, divClassName)}
    {...props}
  >
    {label || props.children}
    {showAsterisk && <span className="text-red-500">*</span>}
  </label>
));
Label.displayName = "Label"

export { Label }