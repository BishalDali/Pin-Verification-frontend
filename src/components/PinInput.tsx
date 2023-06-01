import React, { ChangeEvent, useRef } from "react";

interface PinInputProps {
  value: string;
  onChange: (value: string) => void;
  onPaste: (pastedValue: string) => void;
  hasError: boolean;
}

const PinInput: React.FC<PinInputProps> = ({ value, onChange, onPaste, hasError }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, 1); // Only take the first character
    onChange(newValue);

    if (newValue !== "") {
      const isLastInput = inputRef.current?.nextSibling === null;
      if (!isLastInput) {
        const nextInput = inputRef.current?.nextSibling;
        if(nextInput instanceof HTMLInputElement){
          nextInput.focus();
        }
      } else {
        event.target.blur(); // Move focus out of the last input field
      }
    } else {
      const isFirstInput = inputRef.current?.previousSibling === null;
      if (!isFirstInput) {
        const previousInput = inputRef.current?.previousSibling;
        
        if (previousInput instanceof HTMLInputElement) {
          previousInput.focus();
        }
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = event.clipboardData.getData("text");
    onPaste(pastedValue);
  };

  return (
    <input
      ref={inputRef}
      type="number"
      inputMode="decimal"
      className={`h-10 w-10 border-2 rounded-md border-black border-b-gray-500 border-r-gray-500 text-center text-2xl ${hasError && "border-red-500 border-b-red-500 border-r-red-500" }`}
      maxLength={1}
      max={9}
      min={0}
      value={value}
      onChange={handleInputChange}
      onPaste={handlePaste}
      
    />
  );
};

export default PinInput;
