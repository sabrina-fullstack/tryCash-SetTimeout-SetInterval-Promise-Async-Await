import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import ArticleScreen from "./src/screens/ArticleScreen";
import SearchScreen from "./src/screens/SearchScreen";
import BookmarksScreen from "./src/screens/BookmarksScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a1a2e",
          borderTopColor: "#333",
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 6,
          height: 60,
        },
        tabBarActiveTintColor: "#4fc3f7",
        tabBarInactiveTintColor: "#666",
        tabBarLabelStyle: { fontSize: 10, marginTop: 2 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Accueil") iconName = "home";
          else if (route.name === "Recherche") iconName = "search";
          else if (route.name === "Sauvegardés") iconName = "bookmark";
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Recherche" component={SearchScreen} />
      <Tab.Screen name="Sauvegardés" component={BookmarksScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={HomeTabs} />
        <Stack.Screen name="Article" component={ArticleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
