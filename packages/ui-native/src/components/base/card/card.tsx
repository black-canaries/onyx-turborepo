import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

const variantStyles = {
  default: 'bg-white border border-gray-200 rounded-lg',
  outlined: 'bg-transparent border border-gray-300 rounded-lg',
  elevated: 'bg-white rounded-lg shadow-lg',
};

export function Card({
  children,
  variant = 'default',
  className,
  ...props
}: CardProps) {
  return (
    <View
      className={cn('p-4', variantStyles[variant], className)}
      {...props}
    >
      {children}
    </View>
  );
}

export interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <View className={cn('mb-4', className)} {...props}>
      {children}
    </View>
  );
}

export interface CardContentProps extends ViewProps {
  children: React.ReactNode;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <View className={cn('', className)} {...props}>
      {children}
    </View>
  );
}

export interface CardFooterProps extends ViewProps {
  children: React.ReactNode;
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <View className={cn('mt-4 flex-row gap-2', className)} {...props}>
      {children}
    </View>
  );
}
