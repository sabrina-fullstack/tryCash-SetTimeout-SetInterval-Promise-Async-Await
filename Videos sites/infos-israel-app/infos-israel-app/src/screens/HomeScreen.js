import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image,
  StyleSheet, ActivityIndicator, ScrollView, RefreshControl,
  SafeAreaView, StatusBar, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchPosts, CATEGORIES, formatDate } from '../utils/api';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const scrollY = useRef(new Animated.Value(0)).current;

  const loadPosts = useCallback(async (cat, pg, refresh = false) => {
    try {
      const catObj = CATEGORIES.find(c => c.id === cat);
      const { posts: newPosts, totalPages: tp } = await fetchPosts({
        categoryId: cat === 'all' ? null : cat,
        page: pg,
        perPage: 12,
      });
      setTotalPages(tp);
      if (refresh || pg === 1) {
        setPosts(newPosts);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    loadPosts(selectedCategory, 1, true);
  }, [selectedCategory]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    loadPosts(selectedCategory, 1, true);
  };

  const loadMore = () => {
    if (loadingMore || page >= totalPages) return;
    const nextPage = page + 1;
    setPage(nextPage);
    setLoadingMore(true);
    loadPosts(selectedCategory, nextPage);
  };

  const renderArticleCard = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        style={isFirst ? styles.featuredCard : styles.articleCard}
        onPress={() => navigation.navigate('Article', { post: item })}
        activeOpacity={0.85}
      >
        {item.featuredImage ? (
          <Image
            source={{ uri: item.featuredImage }}
            style={isFirst ? styles.featuredImage : styles.articleImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[isFirst ? styles.featuredImage : styles.articleImage, styles.placeholderImage]}>
            <Text style={styles.placeholderEmoji}>🇮🇱</Text>
          </View>
        )}
        <View style={styles.cardBody}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{item.categoryName}</Text>
          </View>
          <Text style={isFirst ? styles.featuredTitle : styles.articleTitle} numberOfLines={3}>
            {item.title}
          </Text>
          {isFirst && item.excerpt ? (
            <Text style={styles.excerpt} numberOfLines={2}>{item.excerpt}</Text>
          ) : null}
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={12} color="#666" />
            <Text style={styles.metaText}>{formatDate(item.date)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const headerComponent = (
    <>
      <View style={styles.breakingBar}>
        <View style={styles.breakingDot} />
        <Text style={styles.breakingLabel}>DIRECT</Text>
        <Text style={styles.breakingText} numberOfLines={1}>
          Infos Israël News — L'actualité en continu
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryTab, selectedCategory === cat.id && styles.categoryTabActive]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text style={[styles.categoryTabText, selectedCategory === cat.id && styles.categoryTabTextActive]}>
              {cat.icon} {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerFlag}>🇮🇱</Text>
          <View>
            <Text style={styles.headerTitle}>Infos Israël News</Text>
            <Text style={styles.headerSub}>L'actualité en direct</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Recherche')} style={styles.headerBtn}>
            <Ionicons name="search" size={22} color="#aaa" />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4fc3f7" />
          <Text style={styles.loadingText}>Chargement des articles...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderArticleCard}
          ListHeaderComponent={headerComponent}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4fc3f7" />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color="#4fc3f7" style={{ margin: 16 }} /> : null
          }
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerFlag: { fontSize: 28 },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  headerSub: { color: '#4fc3f7', fontSize: 11 },
  headerRight: { flexDirection: 'row', gap: 12 },
  headerBtn: { padding: 4 },
  breakingBar: {
    backgroundColor: '#c0392b',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 8,
  },
  breakingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
  breakingLabel: { color: '#fff', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  breakingText: { color: '#ffe', fontSize: 12, flex: 1 },
  categoriesScroll: { backgroundColor: '#1a1a2e' },
  categoriesContent: { paddingHorizontal: 12, paddingVertical: 8, gap: 8, flexDirection: 'row' },
  categoryTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#2a2a4e',
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryTabActive: { backgroundColor: '#4fc3f7', borderColor: '#4fc3f7' },
  categoryTabText: { color: '#aaa', fontSize: 12, fontWeight: '500' },
  categoryTabTextActive: { color: '#111', fontWeight: '700' },
  listContent: { paddingBottom: 20 },
  featuredCard: { margin: 12, backgroundColor: '#1e1e1e', borderRadius: 14, overflow: 'hidden' },
  articleCard: {
    marginHorizontal: 12,
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  featuredImage: { width: '100%', height: 200 },
  articleImage: { width: 100, height: 100 },
  placeholderImage: { backgroundColor: '#2a2a4e', alignItems: 'center', justifyContent: 'center' },
  placeholderEmoji: { fontSize: 32 },
  cardBody: { flex: 1, padding: 12 },
  categoryBadge: {
    backgroundColor: 'rgba(192,57,43,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 6,
  },
  categoryBadgeText: { color: '#e74c3c', fontSize: 10, fontWeight: '600' },
  featuredTitle: { color: '#fff', fontSize: 16, fontWeight: '700', lineHeight: 22, marginBottom: 8 },
  articleTitle: { color: '#ddd', fontSize: 13, fontWeight: '500', lineHeight: 18, marginBottom: 6 },
  excerpt: { color: '#999', fontSize: 12, lineHeight: 17, marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: '#666', fontSize: 11 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: '#666', fontSize: 14 },
});
