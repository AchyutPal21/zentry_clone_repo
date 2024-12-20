import { ReactElement } from "react";

export interface IButtonProps {
  btnId: string;
  title: string;
  styleClasses: string;
  leftIcon?: ReactElement | undefined;
  rightIcon?: ReactElement | undefined;
}
