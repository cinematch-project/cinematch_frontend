import { Popover } from "radix-ui";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { InputSm } from "@/components/InputSm";
import { DoubleSlider } from "@/components/DoubleSlider";

type Props = {
  label: string;
  min: number;
  max: number;
  step?: number;
  values: [number, number];
  onChange: (values: [number, number]) => void;
};

export function RangeFilterPopup({ label, min, max, step, values, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(values);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onChange(currentValue);
    } else {
      setCurrentValue(values);
    }
    setIsOpen(open);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <Button
          variant={"outline"}
          className="w-full justify-between hover:bg-transparent sm:w-auto"
        >
          {label} <ChevronsUpDown className="opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="border-primary/50 bg-bg-dark shadow-primary/10 w-[250px] rounded-lg border px-2 pt-2 pb-4 shadow-sm"
          sideOffset={5}
        >
          <div className="flex justify-between gap-2 pb-4">
            <InputSm
              value={currentValue[0]}
              onChange={(e) =>
                setCurrentValue([
                  isNaN(Number(e.target.value)) ? min : Number(e.target.value),
                  currentValue[1],
                ])
              }
            />
            <InputSm
              value={currentValue[1]}
              onChange={(e) =>
                setCurrentValue([
                  currentValue[0],
                  isNaN(Number(e.target.value)) ? max : Number(e.target.value),
                ])
              }
            />
          </div>
          <DoubleSlider
            values={currentValue}
            min={min}
            max={max}
            step={step}
            onChange={setCurrentValue}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
