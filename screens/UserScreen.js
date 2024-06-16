import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function UserScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setLoading(false);
        navigation.replace("Login");
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Error", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Dashboard</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome to the User Screen!</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Sign Out" onPress={handleSignOut} color="#841584" />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#6200ee",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});
