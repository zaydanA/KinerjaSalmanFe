import { ChangeEvent } from "react";

export default function BaseInputFile({
  id,
  type,
  label,
  value,
  setValue,
}: {
  id: string;
  type?: string;
  label: string;
  value: FileList | null;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <input type="file" id={id} className="hidden" onChange={setValue} />
      <div className="flex flex-row gap-3 items-center">
        <label
          htmlFor={id}
          className="inline-block text-[13px] py-1.5 px-3.5 bg-clr-background-highlight-one rounded-md border-1 border-solid border-clr-text-secondary-darken cursor-pointer text-clr-text-darken hover:bg-clr-background-highlight-three"
        >
          Choose File
        </label>
        <span className="text-[13px] font-thin text-clr-text-primary-darken">{value ? value[0].name : "No file chosen"}</span>
      </div>
    </div>
  );
}