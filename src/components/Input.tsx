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
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  ...props
}: InputProps) {
  const nativeId = React.useId();
  const id = idProp || nativeId;
  const [isFocused, setIsFocused] = React.useState(false);

  const onFocus = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onFocusProp?.(e);
      setIsFocused(true);
    },
    [onFocusProp],
  );

  const onBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onBlurProp?.(e);
      setIsFocused(false);
    },
    [onBlurProp],
  );

  const isLabelActive = isFocused || !!props.value;

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
        className={cn(
          "bg-bg-dark absolute left-14 z-1 font-bold transition-all duration-300",
          isLabelActive && "-translate-x-8 -translate-y-7 px-0.5 text-sm sm:-translate-y-8",
        )}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        data-slot="input"
        className={cn("h-12 w-full min-w-0 py-2 font-medium outline-none sm:h-14", className)}
        {...props}
      />
    </div>
  );
}
