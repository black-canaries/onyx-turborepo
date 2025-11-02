import * as React from "react";
import { View, type ViewProps, TextInput, type TextInputProps, Pressable } from "react-native";
import { cn } from "../../lib/utils";

export interface InputProps extends ViewProps {
  variant?: "underlined" | "outline" | "rounded";
  size?: "sm" | "md" | "lg" | "xl";
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const variantClasses = {
  underlined: "rounded-none border-b data-[invalid=true]:border-b-2 data-[invalid=true]:border-error-700",
  outline: "rounded border data-[invalid=true]:border-error-700 data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary",
  rounded: "rounded-full border data-[invalid=true]:border-error-700 data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary",
};

const sizeClasses = {
  xl: "h-12",
  lg: "h-11",
  md: "h-10",
  sm: "h-9",
};

export const Input = React.forwardRef<View, InputProps>(
  ({ variant = "outline", size = "md", isInvalid, isDisabled, isReadOnly, className, children, ...props }, ref) => {
    const classes = cn(
      "border-background-300 flex-row overflow-hidden content-center",
      "data-[hover=true]:border-outline-400 data-[focus=true]:border-primary-700",
      "data-[disabled=true]:opacity-40 data-[disabled=true]:hover:border-background-300 items-center",
      variantClasses[variant],
      sizeClasses[size],
      className
    );
    return (
      <View
        ref={ref}
        className={classes}
        data-invalid={isInvalid}
        data-disabled={isDisabled}
        data-readonly={isReadOnly}
        {...props}
      >
        {children}
      </View>
    );
  }
);
Input.displayName = "Input";

export interface InputFieldProps extends TextInputProps {
  className?: string;
  placeholder?: string;
  type?: "text" | "password";
}

export const InputField = React.forwardRef<TextInput, InputFieldProps & { variant?: string; isDisabled?: boolean }>(
  ({ className, type, placeholder, variant, isDisabled, ...props }, ref) => {
    const classes = cn(
      "flex-1 text-typography-900 py-0 px-3 placeholder:text-typography-500 h-full",
      "ios:leading-[0px] web:cursor-text web:data-[disabled=true]:cursor-not-allowed",
      "web:outline-0 web:outline-none",
      variant === "underlined" && "px-0",
      variant === "rounded" && "px-4",
      className
    );
    return (
      <TextInput
        ref={ref}
        className={classes}
        secureTextEntry={type === "password"}
        placeholder={placeholder}
        editable={!isDisabled && !props.readOnly}
        {...props}
      />
    );
  }
);
InputField.displayName = "InputField";

export interface InputIconProps {
  as?: React.ComponentType<any>;
  className?: string;
}

export const InputIcon = React.forwardRef<any, InputIconProps & { size?: string }>(
  ({ as: Component, className, size, ...props }, ref) => {
    const sizeIconMap: Record<string, string> = {
      "2xs": "h-3 w-3",
      xs: "h-3.5 w-3.5",
      sm: "h-4 w-4",
      md: "h-[18px] w-[18px]",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
    };
    const classes = cn(
      "justify-center items-center text-typography-400 fill-none",
      size && sizeIconMap[size],
      className
    );
    if (Component) {
      return <Component ref={ref} className={classes} {...props} />;
    }
    return null;
  }
);
InputIcon.displayName = "InputIcon";

export interface InputSlotProps extends ViewProps {
  className?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

export const InputSlot = React.forwardRef<View, InputSlotProps>(
  ({ className, onPress, children, ...props }, ref) => {
    const classes = cn(
      "justify-center items-center web:disabled:cursor-not-allowed",
      className
    );
    return (
      <Pressable ref={ref} className={classes} onPress={onPress} {...props}>
        {children}
      </Pressable>
    );
  }
);
InputSlot.displayName = "InputSlot";
