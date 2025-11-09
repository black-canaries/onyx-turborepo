import React from 'react';
import { View, Text, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface EmptyStateProps extends ViewProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <View
      className={cn('items-center justify-center gap-4 p-8', className)}
      {...props}
    >
      {icon && <View className="mb-2">{icon}</View>}
      <View className="items-center gap-2">
        <Text className="text-center text-lg font-semibold text-gray-900">
          {title}
        </Text>
        {description && (
          <Text className="text-center text-base text-gray-500">
            {description}
          </Text>
        )}
      </View>
      {action && <View className="mt-4">{action}</View>}
    </View>
  );
}
