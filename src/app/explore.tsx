import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  views?: number;
}

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pure English Free Public API (DummyJSON)
  const fetchApiData = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.get("https://dummyjson.com/posts?limit=15");
      setPosts(response.data.posts);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to load remote feed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Public Feeds</Text>
        <Text style={styles.subtitle}>
          Real-time synchronized articles from remote API service.
        </Text>
      </View>

      {/* Loading State */}
      {loading && (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#0284c7" />
          <Text style={styles.statusText}>Fetching latest articles...</Text>
        </View>
      )}

      {/* Error State */}
      {errorMessage && !loading && (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>Error: {errorMessage}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchApiData}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Retry Request</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Real English Posts List */}
      {!loading && !errorMessage && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>ARTICLE #{item.id}</Text>
              </View>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postBody}>{item.body}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statusText: {
    marginTop: 12,
    color: "#64748b",
    fontSize: 14,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 15,
    marginBottom: 14,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#0284c7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  postCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 12,
    elevation: 2,
  },
  tagBadge: {
    backgroundColor: "#e0f2fe",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  tagText: {
    color: "#0284c7",
    fontSize: 11,
    fontWeight: "700",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 6,
    textTransform: "capitalize",
  },
  postBody: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
  },
});