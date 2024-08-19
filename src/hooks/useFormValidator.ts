import { useState } from "react";

// Create some validation helpers that will return this object.
// It takes an input argument and returns err message and whether or not
// it is valid
interface ValidationResponse {
  valid: boolean;
  errors: string[];
}

interface ValidatorsType {
  [key: string]: (val: string) => ValidationResponse;
}

const useFormValidator = (validators: ValidatorsType) => {
  const [validationStatus, setValidationStatuses] = useState(
    Object.keys(validators).reduce(
      (acc: { [key: string]: ValidationResponse }, curr) => {
        if (!acc[curr]) return { ...acc, [curr]: { valid: true, errors: [] } };

        return acc;
      },
      {}
    )
  );

  const validateFields = (fieldValues: { [key: string]: string }) => {
    const validationStatusUpdate = Object.keys(fieldValues).reduce(
      (acc: { [key: string]: ValidationResponse }, curr: string) => {
        if (!acc[curr] && validators[curr])
          return { [curr]: validators[curr](fieldValues[curr]) };

        return acc;
      },
      {}
    );

    setValidationStatuses(validationStatusUpdate);
  };

  return { validationStatus, validateFields };
};

export default useFormValidator;
