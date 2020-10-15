import React from 'react';
import { Checkbox, FormControlLabel } from "@material-ui/core";

export const FormCheckBox = ({
  name,
  label,
  value,
  inputRef,
  control,
  setValue,
  getValues,
  defaultValue
}: any) => {
  return (
    <FormControlLabel
      control={<Checkbox defaultChecked={defaultValue} />}
      name={name}
      inputRef={inputRef}
      value={value}
      label={label}
    />
  );
};
