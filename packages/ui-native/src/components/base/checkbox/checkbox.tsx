import React from 'react';
import { Pressable, View, Text, type PressableProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<PressableProps, 'children'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
}

export function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  error = false,
  className,
  ...props
}: CheckboxProps) {
  const handlePress = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <Pressable
      className={cn('flex-row items-center gap-2', className)}
      onPress={handlePress}
      disabled={disabled}
      {...props}
    >
      <View
        className={cn(
          'h-5 w-5 items-center justify-center rounded border-2',
          checked && !disabled && 'border-blue-600 bg-blue-600',
          !checked && !disabled && 'border-gray-300 bg-white',
          error && 'border-red-600',
          disabled && 'border-gray-200 bg-gray-100 opacity-50'
        )}
      >
        {checked && (
          <Text className="text-xs text-white">✓</Text>
        )}
      </View>
      {label && (
        <Text
          className={cn(
            'text-base text-gray-700',
            disabled && 'text-gray-400'
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
