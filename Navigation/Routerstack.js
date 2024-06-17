// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import UserScreen from '../screens/UserScreen';
import AdminScreen from '../screens/AdminScreen';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { connectToDatabase } from '../firebase';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const BottomTabAdmin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={AdminScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

const RouteStack = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const user = auth.currentUser;
        const userDoc = await getDoc(doc(connectToDatabase(), "users", user.uid));
        setUserRole(userDoc.data().role);
      } else {
        setUser(null);
        setUserRole('');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          userRole === 'admin' ? (
            <Stack.Screen name="admin" component={BottomTabAdmin} />
          ) : (
            <Stack.Screen name="user" component={UserScreen} />
          )
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteStack;
