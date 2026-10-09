import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();

  // Mobile ke Light ya Dark mode ko automatically detect karne ke liye
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Dynamic theme colors
  const theme = {
    bg: isDark ? "#0f172a" : "#f8fafc",
    cardBg: isDark ? "#1e293b" : "#ffffff",
    cardBorder: isDark ? "#334155" : "#e2e8f0",
    textPrimary: isDark ? "#f8fafc" : "#0f172a",
    textSecondary: isDark ? "#94a3b8" : "#64748b",
    statNumber: isDark ? "#38bdf8" : "#0284c7",
    buttonBg: "#0284c7",
  };

  const handleGetStarted = () => {
    router.push("/explore");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.textPrimary }]}>
            AHMAD MUJTABA! 👋
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Let's build something amazing today.
          </Text>
        </View>

        {/* Hero Card */}
        <View
          style={[
            styles.heroCard,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>
            Dashboard Overview
          </Text>
          <Text style={[styles.heroText, { color: theme.textSecondary }]}>
            Explore your mobile application stats, manage active workflows, and
            track daily progress.
          </Text>
          <TouchableOpacity
            style={[styles.heroButton, { backgroundColor: theme.buttonBg }]}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started →</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats Grid */}
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Quick Overview
        </Text>
        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statBox,
              { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[styles.statNumber, { color: theme.statNumber }]}>
              12
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Active Tasks
            </Text>
          </View>
          <View
            style={[
              styles.statBox,
              { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[styles.statNumber, { color: theme.statNumber }]}>
              85%
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Completion
            </Text>
          </View>
          <View
            style={[
              styles.statBox,
              { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[styles.statNumber, { color: theme.statNumber }]}>
              04
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Pending
            </Text>
          </View>
        </View>

        {/* Recent Activity List */}
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Recent Activities
        </Text>
        <View
          style={[
            styles.activityList,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          <View style={styles.activityItem}>
            <View style={styles.bulletDot} />
            <View>
              <Text style={[styles.activityTitle, { color: theme.textPrimary }]}>
                Expo Router Configured
              </Text>
              <Text style={[styles.activityTime, { color: theme.textSecondary }]}>
                Just now
              </Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.bulletDot} />
            <View>
              <Text style={[styles.activityTitle, { color: theme.textPrimary }]}>
                UI Components Loaded
              </Text>
              <Text style={[styles.activityTime, { color: theme.textSecondary }]}>
                10 minutes ago
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
  },
  heroCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 19,
    fontWeight: "600",
    marginBottom: 8,
  },
  heroText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 18,
  },
  heroButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 10,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  activityList: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0284c7",
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  activityTime: {
    fontSize: 12,
    marginTop: 2,
  },
});