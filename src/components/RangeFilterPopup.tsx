import { Popover } from "radix-ui";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/Button";
import { InputSm } from "@/components/InputSm";
import { DoubleSlider } from "@/components/DoubleSlider";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  min: number;
  max: number;
  step?: number;
  values: [number, number];
  onChange: (values: [number, number]) => void;
};

export function RangeFilterPopup({
  open,
  onOpenChange,
  label,
  min,
  max,
  step,
  values,
  onChange,
}: Props) {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <Button variant={"outline"} className="w-[250px] justify-between hover:bg-transparent">
          {label} <ChevronsUpDown className="opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="border-primary/50 shadow-primary/10 w-[250px] rounded-lg border px-2 pt-2 pb-4 shadow-sm"
          sideOffset={5}
        >
          <div className="flex justify-between gap-2 pb-4">
            <InputSm
              value={values[0]}
              onChange={(e) =>
                onChange([isNaN(Number(e.target.value)) ? min : Number(e.target.value), values[1]])
              }
            />
            <InputSm
              value={values[1]}
              onChange={(e) =>
                onChange([values[0], isNaN(Number(e.target.value)) ? max : Number(e.target.value)])
              }
            />
          </div>
          <DoubleSlider values={values} min={min} max={max} step={step} onChange={onChange} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
