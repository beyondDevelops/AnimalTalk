import { useState, useEffect } from "react";

export default function useLengthCheck(inputKinds, inputRef) {
  const [isActive, setIsActive] = useState(false);

  // Initialization validationResults
  const validationResults = new Array(inputKinds.length).fill(false);

  useEffect(() => {
    for (const index in inputKinds) {
      const lengthCheckResult = handleLengthCheck(
        inputRef.current[String(inputKinds[index])]?.value || "",
        leastLength[String(inputKinds[index])]
      );
      if (lengthCheckResult) {
        validationResults[index] = lengthCheckResult;
      }
    }

    const [emailValidationResult, passwordValidationResult] = validationResults;
    if (emailValidationResult && passwordValidationResult) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });

  return [isActive];
}

const handleLengthCheck = (value = "", least) => {
  if (value?.length < least) {
    return false;
  }
  return true;
};

const leastLength = {
  email: 1,
  password: 6,
  username: 2,
  accountname: 1,
  intro: 5,
};
