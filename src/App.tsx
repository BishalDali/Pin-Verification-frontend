import { useState } from "react";
import PinInput from "./components/PinInput";
import { validatePin } from "./service/pin.service";
import { IValidatePinResponse } from "./utils/types";

function App() {
  const [clientVerificationError, setClientVerificationError] = useState(false);
  const [serverVerificationError, setServerVerificationError] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [pinValues, setPinValues] = useState(Array(6).fill(""));

  const handlePinChange = (index: number, value: string) => {
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);
  };

  const handlePaste = (pastedValue: string) => {
    const sanitizedValue = pastedValue.replace(/\D/g, ""); // Remove non-digit characters
    const newPinValues = [...pinValues]; // Copy the current pinValues array
  
    // Distribute the first 6 digits from the sanitized value among the input fields
    for (let i = 0; i < Math.min(sanitizedValue.length, 6); i++) {
      newPinValues[i] = sanitizedValue[i];
    }
  
    setPinValues(newPinValues);
  };
  

  const handleSubmit = async () => {
    // Check for any empty fields
    const hasEmptyField = pinValues.some((value) => value === "");
    if (hasEmptyField) {
      setClientVerificationError(true);
      setVerificationSuccess(false)
      setServerVerificationError(false)
    } else {
      const pinCode = pinValues.join(""); // Converting the pin to string
      try {
        const response: IValidatePinResponse | Error | undefined = await validatePin(pinCode);
        if (response instanceof Error) {
          setServerVerificationError(true);
          setVerificationSuccess(false); // Clear success message
        } else {
          setVerificationSuccess(true);
          setServerVerificationError(false); // Clear error message
        }
      } catch (error) {
        setServerVerificationError(true);
        setVerificationSuccess(false); // Clear success message
      }
      setPinValues(Array(6).fill(""));
      setClientVerificationError(false);
    }
  };
  

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center">
      <div className="flex flex-col p-10 items-center gap-2">
        <div className="font-bold text-xl">Verification Code:</div>
        <div className="flex flex-row justify-center items-center space-x-2 gap-1">
          {pinValues.map((value, index) => (
            <PinInput
              key={index}
              value={value}
              onChange={(newValue) => handlePinChange(index, newValue)}
              onPaste={handlePaste}
              hasError={clientVerificationError && value === ""}
            />
          ))}
        </div>
        {clientVerificationError && (
          <div className="text-red-500">Required All Field</div>
        )}
        {serverVerificationError && (
          <div className="text-red-500">Invalid Code</div>
        )}
        {verificationSuccess && (
          <div className="text-green-500">Verification successful!</div>
        )}
        <button
          className="w-max px-12 py-2 font-semibold text-white text-xl rounded-md bg-[rgb(16,2,73)]"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
  
}

export default App;
