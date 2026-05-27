import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  Image, StyleSheet, ActivityIndicator, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchPosts, formatDate } from '../utils/api';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const { posts } = await fetchPosts({ search: query, perPage: 20 });
      setResults(posts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => navigation.navigate('Article', { post: item })}
    >
      {item.featuredImage ? (
        <Image source={{ uri: item.featuredImage }} style={styles.thumbnail} resizeMode="cover" />
      ) : (
        <View style={[styles.thumbnail, styles.placeholder]}>
          <Text style={{ fontSize: 22 }}>🇮🇱</Text>
        </View>
      )}
      <View style={styles.resultBody}>
        <Text style={styles.categoryText}>{item.categoryName}</Text>
        <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.resultDate}>{formatDate(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔍 Recherche</Text>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Rechercher un article..."
          placeholderTextColor="#555"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => { setQuery(''); setResults([]); setSearched(false); }}>
            <Ionicons name="close-circle" size={18} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4fc3f7" />
        </View>
      ) : searched && results.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Aucun résultat pour "{query}"</Text>
        </View>
      ) : !searched ? (
        <View style={styles.center}>
          <Text style={{ fontSize: 48 }}>🔍</Text>
          <Text style={styles.hintText}>Recherchez parmi des milliers d'articles</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 12 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  header: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  input: { flex: 1, color: '#fff', fontSize: 15, paddingVertical: 12 },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  thumbnail: { width: 90, height: 90 },
  placeholder: { backgroundColor: '#2a2a4e', alignItems: 'center', justifyContent: 'center' },
  resultBody: { flex: 1, padding: 10 },
  categoryText: { color: '#e74c3c', fontSize: 10, fontWeight: '600', marginBottom: 4 },
  resultTitle: { color: '#ddd', fontSize: 13, fontWeight: '500', lineHeight: 18, marginBottom: 6 },
  resultDate: { color: '#666', fontSize: 11 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { color: '#666', fontSize: 15 },
  hintText: { color: '#555', fontSize: 14, textAlign: 'center' },
});
