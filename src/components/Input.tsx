import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  containerClassName?: string;
  IconLeft?: LucideIcon;
};

export function Input({
  label,
  containerClassName,
  IconLeft,
  id: idProp,
  className,
  type,
  ...props
}: InputProps) {
  const nativeId = React.useId();
  const id = idProp || nativeId;

  return (
    <div
      className={cn(
        "animated-border-gradient group relative flex items-center gap-2 rounded-2xl px-4 shadow-xs",
        containerClassName,
      )}
    >
      {IconLeft && <IconLeft className="size-8" />}
      <label
        htmlFor={id}
        className="bg-bg-dark absolute left-14 z-1 font-bold transition-all duration-300 group-focus-within:-translate-x-8 group-focus-within:-translate-y-8 group-focus-within:px-0.5 group-focus-within:text-sm"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        data-slot="input"
        className={cn("h-14 w-full min-w-0 py-2 font-medium outline-none", "", className)}
        {...props}
      />
    </div>
  );
}
