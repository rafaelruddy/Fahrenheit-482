import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import Maps from "./src/screens/Maps";
import Report from "./src/screens/Report";
import Infos from "./src/screens/Infos";
import Settings from "./src/screens/Settings";

import './src/utils/i18n'
import { useTranslation } from 'react-i18next';


const Tab = createBottomTabNavigator();

export default function App() {
  const {t, i18n} = useTranslation();
  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }} // Certifique-se de que o componente tem altura flexível
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Report') {
              iconName = 'warning';
            } else if (route.name === 'Maps') {
              iconName = 'home';
            } else if (route.name === 'Infos') {
              iconName = 'info';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }

            return <Icon name={iconName} size={50} color={color} />;
          },
          tabBarActiveTintColor: '#A60000',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarLabel: () => null,
          tabBarStyle: {
            height: 60,
            display: 'flex',
          },
          tabBarItemStyle: {
            height: 60,
          },
          tabBarHideOnKeyboard: true,
        })}
        >
          <Tab.Screen name="Maps" component={Maps} />
          <Tab.Screen name="Report" component={Report} />
          <Tab.Screen name="Infos" component={Infos} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}
