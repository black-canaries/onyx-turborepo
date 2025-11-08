import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface ProgressBarProps extends ViewProps {
  value: number; // 0-100
  color?: string;
  backgroundColor?: string;
  height?: number;
}

export function ProgressBar({
  value,
  color = 'bg-blue-600',
  backgroundColor = 'bg-gray-200',
  height = 8,
  className,
  ...props
}: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <View
      className={cn('w-full overflow-hidden rounded-full', backgroundColor, className)}
      style={{ height }}
      {...props}
    >
      <View
        className={cn('h-full rounded-full', color)}
        style={{ width: `${clampedValue}%` }}
      />
    </View>
  );
}
