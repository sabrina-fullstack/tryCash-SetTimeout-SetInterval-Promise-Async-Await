import React, { useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity,
  StyleSheet, Share, SafeAreaView, StatusBar, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDate } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ArticleScreen({ navigation, route }) {
  const { post } = route.params;
  const [bookmarked, setBookmarked] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${post.title}\n\n${post.link}`,
        url: post.link,
        title: post.title,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookmark = async () => {
    try {
      const saved = await AsyncStorage.getItem('bookmarks');
      let bookmarks = saved ? JSON.parse(saved) : [];
      if (bookmarked) {
        bookmarks = bookmarks.filter(b => b.id !== post.id);
      } else {
        bookmarks.push(post);
      }
      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setBookmarked(!bookmarked);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenInBrowser = () => {
    Linking.openURL(post.link);
  };

  const cleanContent = (html) => {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&#8230;/g, '...')
      .replace(/\s+/g, ' ')
      .trim();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#4fc3f7" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleBookmark} style={styles.actionBtn}>
            <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={22} color="#4fc3f7" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.actionBtn}>
            <Ionicons name="share-outline" size={22} color="#4fc3f7" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenInBrowser} style={styles.actionBtn}>
            <Ionicons name="open-outline" size={22} color="#4fc3f7" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {post.featuredImage ? (
          <Image source={{ uri: post.featuredImage }} style={styles.heroImage} resizeMode="cover" />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={{ fontSize: 64 }}>🇮🇱</Text>
          </View>
        )}

        <View style={styles.articleContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{post.categoryName}</Text>
          </View>

          <Text style={styles.title}>{post.title}</Text>

          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{formatDate(post.date)}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.body}>{cleanContent(post.content)}</Text>

          <TouchableOpacity style={styles.readMoreBtn} onPress={handleOpenInBrowser}>
            <Text style={styles.readMoreText}>Lire l'article complet sur le site</Text>
            <Ionicons name="arrow-forward" size={16} color="#4fc3f7" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backBtn: { padding: 4 },
  headerActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { padding: 8 },
  heroImage: { width: '100%', height: 220 },
  heroPlaceholder: {
    width: '100%', height: 180,
    backgroundColor: '#1a1a2e',
    alignItems: 'center', justifyContent: 'center',
  },
  articleContent: { padding: 16 },
  categoryBadge: {
    backgroundColor: 'rgba(192,57,43,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryBadgeText: { color: '#e74c3c', fontSize: 11, fontWeight: '600' },
  title: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 28, marginBottom: 12 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  metaText: { color: '#666', fontSize: 13 },
  divider: { height: 1, backgroundColor: '#333', marginBottom: 16 },
  body: { color: '#ccc', fontSize: 15, lineHeight: 24 },
  readMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    marginBottom: 32,
    backgroundColor: '#1a1a2e',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4fc3f7',
  },
  readMoreText: { color: '#4fc3f7', fontSize: 14, fontWeight: '600' },
});
