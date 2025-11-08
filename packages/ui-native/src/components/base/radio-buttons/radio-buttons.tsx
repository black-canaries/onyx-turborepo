import React from 'react';
import { View, Pressable, Text, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioButtonsProps extends ViewProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export function RadioButtons({
  options,
  value,
  onChange,
  disabled = false,
  orientation = 'vertical',
  className,
  ...props
}: RadioButtonsProps) {
  return (
    <View
      className={cn(
        'gap-3',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        className
      )}
      {...props}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        const isDisabled = disabled || option.disabled;

        return (
          <Pressable
            key={option.value}
            className="flex-row items-center gap-2"
            onPress={() => !isDisabled && onChange?.(option.value)}
            disabled={isDisabled}
          >
            <View
              className={cn(
                'h-5 w-5 items-center justify-center rounded-full border-2',
                isSelected && !isDisabled && 'border-blue-600',
                !isSelected && !isDisabled && 'border-gray-300',
                isDisabled && 'border-gray-200 opacity-50'
              )}
            >
              {isSelected && (
                <View className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              )}
            </View>
            <Text
              className={cn(
                'text-base text-gray-700',
                isDisabled && 'text-gray-400'
              )}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
