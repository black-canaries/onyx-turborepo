import React from 'react';
import { Text, type TextProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface LabelProps extends TextProps {
  children: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
}

export function Label({
  children,
  disabled = false,
  required = false,
  className,
  ...props
}: LabelProps) {
  return (
    <Text
      className={cn(
        'text-sm font-medium text-gray-700',
        disabled && 'text-gray-400',
        className
      )}
      {...props}
    >
      {children}
      {required && <Text className="text-red-600"> *</Text>}
    </Text>
  );
}
