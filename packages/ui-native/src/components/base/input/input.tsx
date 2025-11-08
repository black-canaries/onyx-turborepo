import React from 'react';
import {
  TextInput,
  View,
  Text,
  type TextInputProps,
} from 'react-native';
import { cn } from '@/lib/utils';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export function Input({
  label,
  error,
  hint,
  disabled = false,
  containerClassName,
  inputClassName,
  labelClassName,
  ...props
}: InputProps) {
  return (
    <View className={cn('flex-col gap-1.5', containerClassName)}>
      {label && (
        <Text
          className={cn(
            'text-sm font-medium text-gray-700',
            disabled && 'text-gray-400',
            labelClassName
          )}
        >
          {label}
        </Text>
      )}
      <TextInput
        className={cn(
          'rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base text-gray-900',
          'focus:border-blue-600 focus:ring-2 focus:ring-blue-600',
          error && 'border-red-300 focus:border-red-600 focus:ring-red-600',
          disabled && 'bg-gray-50 text-gray-400',
          inputClassName
        )}
        editable={!disabled}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && (
        <Text className="text-sm text-red-600">{error}</Text>
      )}
      {hint && !error && (
        <Text className="text-sm text-gray-500">{hint}</Text>
      )}
    </View>
  );
}
