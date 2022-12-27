import "./form-input.styles";
import { FormInputLabel, Group, Input } from "./form-input.styles";
import { Props } from "./types";

const FormInput = ({ label, value, ...otherProps }: Props) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={Boolean(value)}>{label}</FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
