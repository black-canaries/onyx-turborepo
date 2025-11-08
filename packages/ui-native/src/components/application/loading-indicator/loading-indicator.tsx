import React from 'react';
import { View, ActivityIndicator, Text, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface LoadingIndicatorProps extends ViewProps {
  size?: 'small' | 'large';
  text?: string;
  color?: string;
}

export function LoadingIndicator({
  size = 'large',
  text,
  color = '#3b82f6',
  className,
  ...props
}: LoadingIndicatorProps) {
  return (
    <View
      className={cn('items-center justify-center gap-3', className)}
      {...props}
    >
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text className="text-base text-gray-600">{text}</Text>
      )}
    </View>
  );
}
