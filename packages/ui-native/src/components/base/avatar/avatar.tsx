import React from 'react';
import { View, Text, Image, type ViewProps, type ImageSourcePropType } from 'react-native';
import { cn } from '@/lib/utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AvatarProps extends ViewProps {
  src?: ImageSourcePropType | string;
  alt?: string;
  size?: AvatarSize;
  fallback?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: 'h-6 w-6', text: 'text-xs' },
  sm: { container: 'h-8 w-8', text: 'text-sm' },
  md: { container: 'h-10 w-10', text: 'text-base' },
  lg: { container: 'h-12 w-12', text: 'text-lg' },
  xl: { container: 'h-14 w-14', text: 'text-xl' },
  '2xl': { container: 'h-16 w-16', text: 'text-2xl' },
};

export function Avatar({
  src,
  alt,
  size = 'md',
  fallback,
  className,
  ...props
}: AvatarProps) {
  const sizeStyle = sizeStyles[size];
  const imageSource = typeof src === 'string' ? { uri: src } : src;

  const getFallbackText = () => {
    if (fallback) return fallback;
    if (alt) return alt.charAt(0).toUpperCase();
    return '?';
  };

  return (
    <View
      className={cn(
        'items-center justify-center overflow-hidden rounded-full bg-gray-200',
        sizeStyle.container,
        className
      )}
      {...props}
    >
      {imageSource ? (
        <Image
          source={imageSource}
          className="h-full w-full"
          resizeMode="cover"
        />
      ) : (
        <Text className={cn('font-semibold text-gray-600', sizeStyle.text)}>
          {getFallbackText()}
        </Text>
      )}
    </View>
  );
}
