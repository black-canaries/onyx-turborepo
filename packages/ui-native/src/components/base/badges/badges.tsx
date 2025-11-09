import React from 'react';
import { View, Text, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeColor =
  | 'gray'
  | 'brand'
  | 'error'
  | 'warning'
  | 'success'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink';

export interface BadgeProps extends ViewProps {
  children: React.ReactNode;
  size?: BadgeSize;
  color?: BadgeColor;
  dot?: boolean;
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-sm',
};

const colorStyles: Record<BadgeColor, { bg: string; text: string; dot?: string }> = {
  gray: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-500',
  },
  brand: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
  warning: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    dot: 'bg-yellow-500',
  },
  success: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    dot: 'bg-indigo-500',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    dot: 'bg-purple-500',
  },
  pink: {
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    dot: 'bg-pink-500',
  },
};

export function Badge({
  children,
  size = 'md',
  color = 'gray',
  dot = false,
  className,
  ...props
}: BadgeProps) {
  const colorStyle = colorStyles[color];

  return (
    <View
      className={cn(
        'flex-row items-center rounded-full',
        colorStyle.bg,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <View
          className={cn(
            'mr-1.5 h-1.5 w-1.5 rounded-full',
            colorStyle.dot
          )}
        />
      )}
      <Text className={cn('font-medium', colorStyle.text)}>
        {children}
      </Text>
    </View>
  );
}
