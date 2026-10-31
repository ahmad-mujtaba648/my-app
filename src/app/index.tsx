import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RecordItem {
  id: string;
  title: string;
  category: string;
}

const STORAGE_KEY = "@user_records_data";
const CATEGORY_OPTIONS = ["Work", "Study", "Development", "Personal", "Assignment"];

export default function HomeScreen() {
  const router = useRouter();

  const [items, setItems] = useState<RecordItem[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadStoredRecords();
  }, []);

  const loadStoredRecords = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setItems(JSON.parse(data));
      }
    } catch {
      Alert.alert("Error", "Unable to load saved records.");
    }
  };

  const saveToLocalStorage = async (updatedItems: RecordItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch {
      Alert.alert("Error", "Unable to persist data locally.");
    }
  };

  const handleSaveRecord = () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Please provide a valid record title.");
      return;
    }

    if (editingId) {
      const updated = items.map((item) =>
        item.id === editingId
          ? { ...item, title: title.trim(), category }
          : item
      );
      setItems(updated);
      saveToLocalStorage(updated);
      setEditingId(null);
    } else {
      const newItem: RecordItem = {
        id: Date.now().toString(),
        title: title.trim(),
        category,
      };
      const updated = [newItem, ...items];
      setItems(updated);
      saveToLocalStorage(updated);
    }

    setTitle("");
    setCategory("Work");
  };

  const handleEdit = (item: RecordItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Record", "Are you sure you want to delete this record?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updated = items.filter((item) => item.id !== id);
          setItems(updated);
          saveToLocalStorage(updated);
        },
      },
    ]);
  };

  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>AHMAD MUJTABA! 👋</Text>
          <Text style={styles.subtitle}>Manage your workflow and data seamlessly.</Text>
        </View>

        {/* Dashboard Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Workspace Overview</Text>
          <Text style={styles.heroText}>
            Track activity metrics, manage records locally, and inspect external service integration.
          </Text>
          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => router.push("/explore")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Explore Public Feed →</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Metrics */}
        <Text style={styles.sectionTitle}>Summary Metrics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{items.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{filteredItems.length}</Text>
            <Text style={styles.statLabel}>Visible</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{editingId ? "Active" : "Normal"}</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.cardHeader}>
            {editingId ? "Update Record" : "Add New Record"}
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Record Title or Name..."
            placeholderTextColor="#94a3b8"
            value={title}
            onChangeText={setTitle}
          />

          {/* Interactive Category Selector */}
          <Text style={styles.label}>Select Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.categoryChip,
                  category === cat && styles.categoryChipSelected,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    category === cat && styles.categoryChipTextSelected,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[styles.saveBtn, editingId ? styles.updateBtnColor : null]}
            onPress={handleSaveRecord}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {editingId ? "Save Changes" : "+ Create Record"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title or category..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Records List */}
        <Text style={styles.sectionTitle}>Stored Records</Text>
        {filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No records match your criteria. Create a new record above.
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <View key={item.id} style={styles.recordItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.recordTitle}>{item.title}</Text>
                <Text style={styles.recordCategory}>{item.category}</Text>
              </View>
              <View style={styles.actionsGroup}>
                <Pressable
                  style={styles.editButton}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.actionBtnLabel}>Edit</Text>
                </Pressable>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.actionBtnLabel}>Delete</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
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
    color: "#0f172a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  heroCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    elevation: 3,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  heroText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#475569",
    marginBottom: 18,
  },
  heroButton: {
    backgroundColor: "#0284c7",
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
    fontSize: 17,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0284c7",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  categoryChip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  categoryChipSelected: {
    backgroundColor: "#0284c7",
    borderColor: "#0284c7",
  },
  categoryChipText: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "500",
  },
  categoryChipTextSelected: {
    color: "#ffffff",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 11,
    marginBottom: 14,
    backgroundColor: "#f8fafc",
    color: "#0f172a",
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: "#0284c7",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  updateBtnColor: {
    backgroundColor: "#d97706",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#38bdf8",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
    color: "#0f172a",
    fontSize: 14,
  },
  recordItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  recordTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e293b",
  },
  recordCategory: {
    fontSize: 13,
    color: "#0284c7",
    fontWeight: "500",
    marginTop: 2,
  },
  actionsGroup: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#f59e0b",
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 6,
  },
  actionBtnLabel: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
  },
});