import { useState } from "react";
import type { FilterItem } from "@/service/api/movies";
import { MultiSelect } from "@/components";

type Props = {
  label: string;
  options: Array<FilterItem>;
  values: Array<string>;
  onChange: (values: Array<string>) => void;
};

export function MultiSelectPopup({ label, options, values, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValues, setCurrentValues] = useState(values);

  const onOpenChange = (value: React.SetStateAction<boolean>) => {
    const open = typeof value === "function" ? value(isOpen) : value;
    if (!open) {
      onChange(currentValues);
    } else {
      setCurrentValues(values);
    }
    setIsOpen(open);
  };

  return (
    <MultiSelect
      isPopoverOpen={isOpen}
      setIsPopoverOpen={onOpenChange}
      placeholder={label}
      hideSelectAll={true}
      options={options.map((o) => ({ label: o.name, value: o.id.toString() }))}
      value={currentValues}
      onValueChange={setCurrentValues}
      autoSize={true}
    />
  );
}
