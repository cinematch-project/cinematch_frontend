import { Slider } from "radix-ui";
import { cn } from "@/lib/utils";

type Props = {
  values: [number, number];
  min: number;
  max: number;
  step?: number;
  onChange: (values: [number, number]) => void;
};

export function DoubleSlider({ values, min, max, step, onChange }: Props) {
  return (
    <Slider.Root
      value={values}
      onValueChange={onChange}
      min={min}
      max={max}
      step={step}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
      )}
    >
      <Slider.Track
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
      >
        <Slider.Range
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </Slider.Track>
      <Slider.Thumb className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" />
      <Slider.Thumb className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" />
    </Slider.Root>
  );
}
