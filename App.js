import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen.js';
import ScanScreen from './src/screens/ScanScreen.js';
import CartScreen from './src/screens/CartScreen.js';

const HOME_TAB_ICON = require('./assets/images/tab-home-outline.png');
const CART_TAB_ICON = require('./assets/images/tab-cart-outline.png');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PlaceholderScreen = () => <View style={styles.placeholderScreen} />;

function TabAssetIcon({ focused, source, tintColor }) {
  return (
    <View style={focused ? styles.activeTabBg : null}>
      <Image source={source} style={[styles.assetTabIcon, { tintColor }]} resizeMode="contain" />
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#F39A66',
        tabBarInactiveTintColor: '#B8B8B8',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabAssetIcon focused={focused} source={HOME_TAB_ICON} tintColor={color} />
          ),
        }}
      />

      <Tab.Screen
        name="NotificationsTab"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ScanTab"
        component={PlaceholderScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Scan');
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="scan-outline" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="HistoryTab"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="time-outline" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabAssetIcon focused={focused} source={CART_TAB_ICON} tintColor={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="Scan"
          component={ScanScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  placeholderScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    height: 66,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
    borderTopWidth: 0,
  },
  activeTabBg: {
    backgroundColor: '#FFF1E8',
    padding: 10,
    borderRadius: 14,
  },
  assetTabIcon: {
    width: 22,
    height: 22,
  },
});
