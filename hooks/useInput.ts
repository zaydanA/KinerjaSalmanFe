import { useState, ChangeEvent } from 'react';

export function useInput(
  defaultValue: string = '',
): [
  string,
  (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | string,
  ) => void,
] {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange(
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | string,
  ) {
    if (typeof event === 'string') {
      setValue(event);
    } else {
      setValue(event.target.value);
    }
  }

  return [value, handleValueChange];
}