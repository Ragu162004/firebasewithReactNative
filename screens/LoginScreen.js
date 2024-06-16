// screens/LoginScreen.js
import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { auth, connectToDatabase } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        const user = auth.currentUser;
        const userDoc = await getDoc(
          doc(connectToDatabase(), "users", user.uid)
        );
        const userRole = userDoc.data().role;

        if (userRole === "admin") {
          navigation.replace("admin");
        } else {
          navigation.replace("user");
        }
        // navigation.replace('Home');
      })
      .catch((error) => setError(error.message));
  };

  return (
        <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
          <Image
            style={styles.top_image}
            source={require("../photos/Vector 1.png")}
            resizeMode="cover"
          />

          <View style={styles.abs_image}></View>
          <View style={styles.form_container}>
            <View style={styles.form_title_container}>
              <Text style={styles.heading}>Login</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.form_input1}>
                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor={"gray"}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View style={styles.form_input2}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password ?</Text>
              </TouchableOpacity>
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <View style={styles.button}>
                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                  <Text style={styles.btn_text}>Login</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.account}>
                <Text style={styles.account_text}>Don't have an account? </Text>
                <TouchableOpacity>
                  <Text
                    style={styles.btn_signup}
                    onPress={() => {
                      navigation.navigate("Signup");
                    }}
                  >
                    SignUp
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
  },
  forgot: {
    position: "absolute",
    right: 0,
    marginTop: 5,
    color: "#4D9899",
    paddingRight: 70,
  },
  top_image: {
    position: "absolute",
  },
  abs_image: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  form_container: {
    paddingTop: "50%",
    height: "100%",
    width: "100%",
    display: "flex",
  },
  form_title_container: {
    display: "flex",
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: "40%",
  },
  heading: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 40,
  },
  form: {
    display: "flex",
    alignItems: "center",
    margin: 4,
    marginVertical: 4,
  },
  form_input1: {
    backgroundColor: "#EBEBEB",
    padding: 15,
    borderRadius: 20,
    width: "100%",
    marginBottom: 15,
  },
  form_input2: {
    backgroundColor: "#EBEBEB",
    padding: 15,
    borderRadius: 20,
    width: "100%",
  },
  button: {
    width: "100%",
  },
  btn: {
    width: "100%",
    backgroundColor: "#4D9899",
    padding: 15,
    borderRadius: 20,
    marginTop: 40,
  },
  btn_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  account: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  btn_signup: {
    color: "#006B6C",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
