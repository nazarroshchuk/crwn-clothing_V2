import { InputHTMLAttributes } from "react";

export type Props = {
  label?: string;
  value: string;
} & InputHTMLAttributes<HTMLInputElement>;
