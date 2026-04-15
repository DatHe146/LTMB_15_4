import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Hello 👋</Text>
            <Text style={styles.nameText}>Christie Doe</Text>
          </View>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?u=christie' }} 
            style={styles.avatar} 
          />
        </View>

        {/* Insights Title */}
        <Text style={styles.sectionTitle}>Your Insights</Text>

        {/* Insights Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <TouchableOpacity style={styles.insightCard} onPress={() => navigation.navigate('Scan')}>
              <View style={[styles.iconContainer, { backgroundColor: '#E8E8FF' }]}>
                <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: 26, height: 22, borderWidth: 2.5, borderColor: '#6C5CE7', borderRadius: 6 }} />
                  <View style={{ position: 'absolute', width: 34, height: 2.5, backgroundColor: '#6C5CE7', borderRadius: 2 }} />
                </View>
              </View>
              <Text style={styles.cardTitle}>Scan new</Text>
              <Text style={styles.cardSubtitle}>Scanned 483</Text>
            </TouchableOpacity>

            <View style={styles.insightCard}>
              <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                <FontAwesome name="exclamation-triangle" size={32} color="#FFB74D" />
              </View>
              <Text style={styles.cardTitle}>Counterfeits</Text>
              <Text style={styles.cardSubtitle}>Counterfeited 32</Text>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.insightCard}>
              <View style={[styles.iconContainer, { backgroundColor: '#81E6D9' }]}>
                <Ionicons name="checkmark" size={36} color="#FFFFFF" />
              </View>
              <Text style={styles.cardTitle}>Success</Text>
              <Text style={styles.cardSubtitle}>Checkouts 8</Text>
            </View>

            <View style={styles.insightCard}>
              <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                <Feather name="calendar" size={32} color="#42A5F5" />
              </View>
              <Text style={styles.cardTitle}>Directory</Text>
              <Text style={styles.cardSubtitle}>History 26</Text>
            </View>
          </View>
        </View>

        {/* Explore More Header */}
        <View style={styles.exploreHeader}>
          <Text style={styles.sectionTitle}>Explore More</Text>
          <Ionicons name="arrow-forward" size={24} color="#000" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 40,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  nameText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  gridContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  insightCard: {
    backgroundColor: '#FFF',
    width: '48%',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
