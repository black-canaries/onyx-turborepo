import React from 'react';
import { Pressable, Animated, type PressableProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface ToggleProps extends Omit<PressableProps, 'children'> {
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: {
    container: 'h-5 w-9',
    thumb: 'h-4 w-4',
    translate: 16,
  },
  md: {
    container: 'h-6 w-11',
    thumb: 'h-5 w-5',
    translate: 20,
  },
  lg: {
    container: 'h-7 w-14',
    thumb: 'h-6 w-6',
    translate: 28,
  },
};

export function Toggle({
  enabled = false,
  onChange,
  disabled = false,
  size = 'md',
  className,
  ...props
}: ToggleProps) {
  const [animValue] = React.useState(new Animated.Value(enabled ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(animValue, {
      toValue: enabled ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [enabled, animValue]);

  const handlePress = () => {
    if (!disabled && onChange) {
      onChange(!enabled);
    }
  };

  const sizeStyle = sizeStyles[size];
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, sizeStyle.translate],
  });

  return (
    <Pressable
      className={cn(
        'justify-center rounded-full',
        sizeStyle.container,
        enabled && !disabled ? 'bg-blue-600' : 'bg-gray-200',
        disabled && 'opacity-50',
        className
      )}
      onPress={handlePress}
      disabled={disabled}
      {...props}
    >
      <Animated.View
        className={cn(
          'rounded-full bg-white shadow-sm',
          sizeStyle.thumb
        )}
        style={{
          transform: [{ translateX }],
        }}
      />
    </Pressable>
  );
}
