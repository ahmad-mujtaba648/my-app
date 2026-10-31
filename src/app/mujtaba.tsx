import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MujtabaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Professional Initial Avatar */}
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>AM</Text>
      </View>

      <Text style={styles.name}>Ahmad Mujtaba</Text>
      <Text style={styles.role}>Mobile Application Developer</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.infoText}>
          Passionate developer pursuing BS Computer Science, specializing in cross-platform mobile apps with React Native, Expo, and modern TypeScript architectures.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Project Highlights</Text>
        <Text style={styles.skillBadge}>• React Native & Expo Router</Text>
        <Text style={styles.skillBadge}>• CRUD & AsyncStorage Local Persistence</Text>
        <Text style={styles.skillBadge}>• RESTful APIs Integration with Axios</Text>
        <Text style={styles.skillBadge}>• Real-time Search & Multi-Category Filtering</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#0f172a',
    minHeight: '100%',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 16,
    shadowColor: '#2563eb',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  role: {
    fontSize: 15,
    color: '#94a3b8',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 18,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  skillBadge: {
    fontSize: 14,
    color: '#e2e8f0',
    marginVertical: 4,
  },
});