import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Developer Profile</Text>
        <Text style={styles.subtitle}>Mobile Application Development</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>AM</Text>
        </View>
        <Text style={styles.name}>Ahmad Mujtaba</Text>
        <Text style={styles.role}>React Native Developer</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Course:</Text>
          <Text style={styles.value}>Mobile App Development</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Technology:</Text>
          <Text style={styles.value}>React Native (Expo)</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Features:</Text>
          <Text style={styles.value}>CRUD, Storage & Axios API</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.value, styles.statusActive]}>Production Ready</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0284c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  role: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 14,
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
  },
  statusActive: {
    color: '#16a34a',
  },
});