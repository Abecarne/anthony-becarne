import { ComponentType } from "react";

export type IconProps = {
  className?: string;
};

export type IconComponent = ComponentType<{
  className?: string;
  size?: number;
}>;
