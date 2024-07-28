import { useState } from "react";

type UseToggle = (defaultValue: boolean) => [boolean, (newValue?: boolean) => void];

const useToggle: UseToggle = (defaultValue) => {
  const [currentValue, setCurrentValue] = useState<boolean>(defaultValue);

  const toggleValue = (newValue?: boolean) => {
    setCurrentValue((value) => (typeof newValue === "boolean" ? newValue : !value));
  };

  return [currentValue, toggleValue];
};

export default useToggle;
