import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function NewScreen() {
  // Mobile ka light ya dark mode detect karne ke liye
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Dynamic theme colors
  const theme = {
    bg: isDark ? '#0f172a' : '#ffffff',
    text: isDark ? '#f8fafc' : '#333333',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.text, { color: theme.text }]}>
        Yeh mera naya page hai!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});