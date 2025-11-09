import React from 'react';
import { Text, type TextProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface HintTextProps extends TextProps {
  children: React.ReactNode;
  error?: boolean;
}

export function HintText({
  children,
  error = false,
  className,
  ...props
}: HintTextProps) {
  return (
    <Text
      className={cn(
        'text-sm',
        error ? 'text-red-600' : 'text-gray-500',
        className
      )}
      {...props}
    >
      {children}
    </Text>
  );
}
