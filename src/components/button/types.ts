import { BUTTON_TYPE_CLASSES } from "./button.component";
import React, { ButtonHTMLAttributes } from "react";

export type Props = {
  children: React.ReactNode;
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
