import { useState } from "react";

export default function useInput(initialValue, limitConditions) {
  const [isVerified, setIsVerified] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e) => {
    setInputValue(e?.target.value);
  };

  const handleLengthCheck = () => {
    console.log(inputValue);
    if (limitConditions?.length && inputValue.length >= limitConditions.length)
      setIsVerified(true);
  };

  return [inputValue, handleChange, isVerified, handleLengthCheck];
}
