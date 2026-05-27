import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image,
  StyleSheet, SafeAreaView, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate } from '../utils/api';

export default function BookmarksScreen({ navigation }) {
  const [bookmarks, setBookmarks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const loadBookmarks = async () => {
    try {
      const saved = await AsyncStorage.getItem('bookmarks');
      setBookmarks(saved ? JSON.parse(saved) : []);
    } catch (e) {
      console.error(e);
    }
  };

  const removeBookmark = async (id) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const clearAll = () => {
    Alert.alert(
      'Supprimer tout',
      'Voulez-vous supprimer tous les articles sauvegardés ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer', style: 'destructive',
          onPress: async () => {
            setBookmarks([]);
            await AsyncStorage.removeItem('bookmarks');
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Article', { post: item })}
    >
      {item.featuredImage ? (
        <Image source={{ uri: item.featuredImage }} style={styles.thumbnail} resizeMode="cover" />
      ) : (
        <View style={[styles.thumbnail, styles.placeholder]}>
          <Text style={{ fontSize: 22 }}>🇮🇱</Text>
        </View>
      )}
      <View style={styles.cardBody}>
        <Text style={styles.categoryText}>{item.categoryName}</Text>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
      </View>
      <TouchableOpacity onPress={() => removeBookmark(item.id)} style={styles.removeBtn}>
        <Ionicons name="trash-outline" size={18} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔖 Articles sauvegardés</Text>
        {bookmarks.length > 0 && (
          <TouchableOpacity onPress={clearAll}>
            <Text style={styles.clearBtn}>Tout effacer</Text>
          </TouchableOpacity>
        )}
      </View>

      {bookmarks.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ fontSize: 64 }}>🔖</Text>
          <Text style={styles.emptyTitle}>Aucun article sauvegardé</Text>
          <Text style={styles.emptyText}>
            Appuyez sur l'icône signet dans un article pour le sauvegarder ici
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  clearBtn: { color: '#e74c3c', fontSize: 13 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  thumbnail: { width: 90, height: 90 },
  placeholder: { backgroundColor: '#2a2a4e', alignItems: 'center', justifyContent: 'center' },
  cardBody: { flex: 1, padding: 10 },
  categoryText: { color: '#e74c3c', fontSize: 10, fontWeight: '600', marginBottom: 4 },
  title: { color: '#ddd', fontSize: 13, fontWeight: '500', lineHeight: 18, marginBottom: 6 },
  date: { color: '#666', fontSize: 11 },
  removeBtn: { padding: 12 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  emptyTitle: { color: '#aaa', fontSize: 18, fontWeight: '600' },
  emptyText: { color: '#555', fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
