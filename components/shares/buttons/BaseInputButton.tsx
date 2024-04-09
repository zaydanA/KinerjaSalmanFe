type BaseButtonType = {
  text: string;
  type?: "default" | "submit" | "underlined" | "outlined";
  disabled?: boolean;
  onClick: () => void;
};

export default function BaseInputButton({
  text,
  type = "default",
  disabled = false,
  onClick,
}: BaseButtonType) {
  return (
    <button
      disabled={disabled}
      className={`
        ${type === "default" && !disabled ? "bg-blue-500 text-white hover:bg-blue-700" : ""}
        ${type === "submit" && !disabled ? "bg-clr-kinerja-gold text-white hover:bg-clr-kinerja-gold-hover" : ""}
        ${type === "underlined" && !disabled ? "bg-transparent text-gray-500 hover:underline" : ""}
        ${type === "outlined" && !disabled ? "bg-white text-clr-kinerja-gold border-1 border-clr-kinerja-gold hover:bg-clr-kinerja-gold hover:text-white" : ""}
        ${disabled ? "bg-gray-100 text-gray-300 hover:bg-gray-100" : ""} 
        rounded px-4 py-2 text-sm h-fit font-medium max-sm:h-10 max-sm:w-fit max-sm:px-1 max-sm:py-0 max-sm:text-[10px]
        `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
