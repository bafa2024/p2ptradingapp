import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import TradeScreen from '../screens/TradeScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingFlow from '../screens/OnboardingFlow';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

// Home Stack Navigator
const HomeStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: Colors.bgPrimary },
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Trade" component={TradeScreen} />
  </Stack.Navigator>
);

// Placeholder screens for other tabs
const OrdersScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bgPrimary }}>
    <Text style={{ color: Colors.textPrimary, fontSize: 18 }}>Orders Screen</Text>
  </View>
);

const WalletScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bgPrimary }}>
    <Text style={{ color: Colors.textPrimary, fontSize: 18 }}>Wallet Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bgPrimary }}>
    <Text style={{ color: Colors.textPrimary, fontSize: 18 }}>Profile Screen</Text>
  </View>
);

// Placeholder Auth Screen (Login/Signup)
const AuthScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bgPrimary }}>
    <Text style={{ color: Colors.textPrimary, fontSize: 18 }}>Login/Signup Screen</Text>
    <Text style={{ color: Colors.textSecondary, fontSize: 14, marginTop: 10 }}>Coming Soon</Text>
  </View>
);

// Main Tab Navigator
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'HomeTab':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Orders':
            iconName = focused ? 'list' : 'list-outline';
            break;
          case 'Wallet':
            iconName = focused ? 'wallet' : 'wallet-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'circle';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.colorBuy,
      tabBarInactiveTintColor: Colors.textMuted,
      tabBarStyle: {
        backgroundColor: Colors.bgSecondary,
        borderTopColor: Colors.borderColor,
        borderTopWidth: 1,
        height: 80,
        paddingBottom: 8,
        paddingTop: 8,
      },
      tabBarLabelStyle: {
        fontSize: Typography.fontSizes.xs,
        fontWeight: Typography.fontWeights.medium,
      },
    })}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeStackNavigator}
      options={{
        tabBarLabel: 'P2P',
      }}
    />
    <Tab.Screen 
      name="Orders" 
      component={OrdersScreen}
      options={{
        tabBarLabel: 'Orders',
      }}
    />
    <Tab.Screen 
      name="Wallet" 
      component={WalletScreen}
      options={{
        tabBarLabel: 'Wallet',
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
      }}
    />
  </Tab.Navigator>
);

// Main App Navigator
const AppNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.bgPrimary },
      }}
    >
      <RootStack.Screen 
        name="Splash" 
        component={SplashScreen}
        options={{
          animationEnabled: false,
        }}
      />
      <RootStack.Screen 
        name="Onboarding" 
        component={OnboardingFlow}
        options={{
          animationEnabled: true,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
      />
      <RootStack.Screen 
        name="Auth" 
        component={AuthScreen}
        options={{
          animationEnabled: true,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
      />
      <RootStack.Screen 
        name="Home" 
        component={MainTabNavigator}
        options={{
          animationEnabled: true,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
