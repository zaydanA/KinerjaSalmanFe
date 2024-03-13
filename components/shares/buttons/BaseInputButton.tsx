
type BaseButtonType = {
  text: string,
  type?: "default" | "submit" | "underlined"
  disabled?: boolean,
  onClick: () => void
};

export default function BaseInputButton({ 
  text,
  type = "default",
  disabled = false,
  onClick
}: BaseButtonType) {
  return (
    <button
      disabled={disabled} 
      className={
        `
        ${type === 'default' && !disabled ? 'bg-blue-500 hover:bg-blue-700 text-white' : ''}
        ${type === 'submit' && !disabled ? 'bg-green-500 hover:bg-green-700 text-white' : ''}
        ${type === 'underlined' && !disabled ? 'bg-transparent text-gray-500 hover:underline' : ''}
        ${disabled ? 'bg-gray-100 hover:bg-gray-100 text-gray-300' : '' } 
        font-medium text-sm py-2 px-4 rounded
        `
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
}