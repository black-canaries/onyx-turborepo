import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
} from 'react-native';
import { cn } from '@/lib/utils';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link-gray'
  | 'link-color'
  | 'primary-destructive'
  | 'secondary-destructive'
  | 'tertiary-destructive';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  children?: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 rounded-lg',
  md: 'px-3.5 py-2.5 rounded-lg',
  lg: 'px-4 py-2.5 rounded-lg',
  xl: 'px-4.5 py-3 rounded-lg',
};

const colorStyles: Record<ButtonColor, { button: string; text: string }> = {
  primary: {
    button: 'bg-blue-600 active:bg-blue-700',
    text: 'text-white font-semibold',
  },
  secondary: {
    button: 'bg-white border border-gray-300 active:bg-gray-50',
    text: 'text-gray-700 font-semibold',
  },
  tertiary: {
    button: 'bg-transparent active:bg-gray-100',
    text: 'text-gray-700 font-semibold',
  },
  'link-gray': {
    button: 'bg-transparent',
    text: 'text-gray-700 underline',
  },
  'link-color': {
    button: 'bg-transparent',
    text: 'text-blue-600 underline',
  },
  'primary-destructive': {
    button: 'bg-red-600 active:bg-red-700',
    text: 'text-white font-semibold',
  },
  'secondary-destructive': {
    button: 'bg-white border border-red-300 active:bg-red-50',
    text: 'text-red-700 font-semibold',
  },
  'tertiary-destructive': {
    button: 'bg-transparent active:bg-red-50',
    text: 'text-red-700 font-semibold',
  },
};

const disabledStyles = {
  button: 'opacity-50',
  text: 'text-gray-400',
};

export function Button({
  children,
  size = 'md',
  color = 'primary',
  disabled = false,
  loading = false,
  className,
  textClassName,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const colorStyle = colorStyles[color];

  return (
    <Pressable
      className={cn(
        'flex-row items-center justify-center',
        sizeStyles[size],
        colorStyle.button,
        isDisabled && disabledStyles.button,
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && <ActivityIndicator size="small" className="mr-2" />}
      {typeof children === 'string' ? (
        <Text
          className={cn(
            colorStyle.text,
            isDisabled && disabledStyles.text,
            textClassName
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
