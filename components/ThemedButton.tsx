import React from 'react';
import { TouchableOpacity, Text, type TouchableOpacityProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  title: string;
  type?: 'primary' | 'secondary' | 'red' | 'green' | 'blue';
};

export function ThemedButton({
  title,
  lightColor,
  darkColor,
  type = 'primary',
  style,
  ...rest
}: ThemedButtonProps) {

  const backgroundColor = type === 'red'
    ? '#FF0000' 
    : type === 'green'
    ? '#28A745' 
    : type === 'blue'
    ? '#007BFF'  
    : useThemeColor(
        { light: lightColor || '#FFCD00', dark: darkColor || '#FFCD00' },
        'background'
      );

  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text'); 

  const buttonStyles = [
    styles.button,
    { backgroundColor },
    type === 'primary' ? styles.primary : type === 'red' ? styles.red : type === 'green' ? styles.green : type === 'blue' ? styles.blue : styles.secondary,
    style,
  ];

  const textStyles = [
    styles.text,
    { color: textColor },
    type === 'primary' ? styles.primaryText : type === 'red' ? styles.redText : type === 'green' ? styles.greenText : type === 'blue' ? styles.blueText : styles.secondaryText,
  ];

  return (
    <TouchableOpacity style={buttonStyles} {...rest}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    //Create later if needed
  },
  secondary: {
    //Create later if needed
  },
  red: {
    backgroundColor: '#FF0000',
  },
  green: {
    backgroundColor: '#28A745',
  },
  blue: {
    backgroundColor: '#007BFF',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#000000',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  redText: {
    color: '#FFFFFF', 
  },
  greenText: {
    color: '#FFFFFF', 
  },
  blueText: {
    color: '#FFFFFF',
  },
});
