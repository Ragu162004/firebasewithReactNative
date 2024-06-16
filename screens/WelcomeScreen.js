import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../photos/pexels-photo-733852.webp")}
        style={styles.background}
      >
          <Text style={styles.welcomeText}>Welcome</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 200,
    width: "100%",
    zIndex: -3,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  btn1: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#de6283",
    borderRadius: 10,
  },
  btn2: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#246c6e",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});
