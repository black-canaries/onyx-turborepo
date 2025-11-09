import React from 'react';
import { View, Text, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

// Note: This component requires @react-native-picker/picker to be installed
// Install it in your app with: pnpm add @react-native-picker/picker
// Then uncomment the import below:
// import { Picker, type PickerProps } from '@react-native-picker/picker';

export interface SelectNativeProps extends ViewProps {
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

export function SelectNative({
  label,
  error,
  hint,
  disabled = false,
  containerClassName,
  labelClassName,
}: SelectNativeProps) {
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
      <View
        className={cn(
          'rounded-lg border border-gray-300 bg-white p-3',
          error && 'border-red-300',
          disabled && 'bg-gray-50'
        )}
      >
        <Text className="text-gray-400 text-sm">
          SelectNative requires @react-native-picker/picker
        </Text>
        {/* Uncomment when @react-native-picker/picker is installed:
        <Picker
          enabled={!disabled}
          {...props}
        />
        */}
      </View>
      {error && (
        <Text className="text-sm text-red-600">{error}</Text>
      )}
      {hint && !error && (
        <Text className="text-sm text-gray-500">{hint}</Text>
      )}
    </View>
  );
}
