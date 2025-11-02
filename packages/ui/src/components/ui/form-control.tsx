import * as React from "react";
import { View, type ViewProps, Text as RNText } from "react-native";
import { cn } from "../../lib/utils";

export interface FormControlProps extends ViewProps {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export const FormControl = React.forwardRef<View, FormControlProps>(
  ({ isInvalid, isRequired, isDisabled, isReadOnly, size = "md", className, children, ...props }, ref) => {
    const classes = cn("flex flex-col", className);
    return (
      <View
        ref={ref}
        className={classes}
        data-invalid={isInvalid}
        data-required={isRequired}
        data-disabled={isDisabled}
        data-readonly={isReadOnly}
        {...props}
      >
        {children}
      </View>
    );
  }
);
FormControl.displayName = "FormControl";

export interface FormControlLabelProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

export const FormControlLabel = React.forwardRef<View, FormControlLabelProps>(
  ({ className, children, ...props }, ref) => {
    const classes = cn("flex flex-row justify-start items-center mb-1", className);
    return (
      <View ref={ref} className={classes} {...props}>
        {children}
      </View>
    );
  }
);
FormControlLabel.displayName = "FormControlLabel";

export interface FormControlLabelTextProps {
  className?: string;
  children?: React.ReactNode;
}

export const FormControlLabelText = React.forwardRef<RNText, FormControlLabelTextProps>(
  ({ className, children, ...props }, ref) => {
    const classes = cn("font-medium text-typography-900", className);
    return (
      <RNText ref={ref} className={classes} {...props}>
        {children}
      </RNText>
    );
  }
);
FormControlLabelText.displayName = "FormControlLabelText";

export interface FormControlHelperProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

export const FormControlHelper = React.forwardRef<View, FormControlHelperProps>(
  ({ className, children, ...props }, ref) => {
    const classes = cn("flex flex-row justify-start items-center mt-1", className);
    return (
      <View ref={ref} className={classes} {...props}>
        {children}
      </View>
    );
  }
);
FormControlHelper.displayName = "FormControlHelper";

export interface FormControlHelperTextProps {
  className?: string;
  children?: React.ReactNode;
}

export const FormControlHelperText = React.forwardRef<RNText, FormControlHelperTextProps>(
  ({ className, children, ...props }, ref) => {
    const classes = cn("text-typography-500", className);
    return (
      <RNText ref={ref} className={classes} {...props}>
        {children}
      </RNText>
    );
  }
);
FormControlHelperText.displayName = "FormControlHelperText";

export interface FormControlErrorProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

export const FormControlError = React.forwardRef<View, FormControlErrorProps>(
  ({ className, children, ...props }, ref) => {
    const classes = cn("flex flex-row justify-start items-center mt-1 gap-1", className);
    return (
      <View ref={ref} className={classes} {...props}>
        {children}
      </View>
    );
  }
);
FormControlError.displayName = "FormControlError";

export interface FormControlErrorTextProps {
  className?: string;
  children?: React.ReactNode;
}

export const FormControlErrorText = React.forwardRef<RNText, FormControlErrorTextProps>(
  ({ className, children, ...props }, ref) => {
    const classes = cn("text-error-700", className);
    return (
      <RNText ref={ref} className={classes} {...props}>
        {children}
      </RNText>
    );
  }
);
FormControlErrorText.displayName = "FormControlErrorText";

export interface FormControlErrorIconProps {
  as?: React.ComponentType<any>;
  className?: string;
}

export const FormControlErrorIcon = React.forwardRef<any, FormControlErrorIconProps>(
  ({ as: Component, className, ...props }, ref) => {
    const classes = cn("text-error-700 fill-none", className);
    if (Component) {
      return <Component ref={ref} className={classes} {...props} />;
    }
    return null;
  }
);
FormControlErrorIcon.displayName = "FormControlErrorIcon";

