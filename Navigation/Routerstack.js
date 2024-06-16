
import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import WelcomeScreen from "../screens/WelcomeScreen";
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import UserScreen from '../screens/UserScreen';
import AdminScreen from '../screens/AdminScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const BottomTabAdmin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Dashboard' component={AdminScreen}/>
      <Tab.Screen name='User' component={UserScreen}/>
    </Tab.Navigator>
  )
}

const RouteStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="user" component={UserScreen} />
          <Stack.Screen name="admin" component={BottomTabAdmin} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default RouteStack;
