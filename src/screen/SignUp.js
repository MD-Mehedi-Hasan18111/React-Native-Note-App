import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import styles from "../styles/AllStyle";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth();

  const signUp = () => {
    if (email != "" && password != "" && confirmPassword != "") {
      if (password === confirmPassword) {
        if (password.length >= 6) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              console.log(userCredential.user.email);
            })
            .catch((err) => {
              alert(err.message);
            });
        } else {
          alert("Password should be at least 6 character.");
        }
      } else {
        alert("Confirm Password didn't matched!");
      }
    } else {
      alert("Input field must be fill up");
    }
  };

  return (
    <View>
      <View style={styles.headerDiv}>
        <Text style={styles.headingStyle}>Sign Up</Text>
        <Text style={{ fontSize: 16, color: "#000" }}>
          Please! Create your account here
        </Text>
      </View>
      <View style={styles.formDiv}>
        <TextInput
          onChangeText={(email) => setEmail(email)}
          placeholder="Email..."
          placeholderTextColor="#95a5a6"
          style={styles.InputField}
        />
        <TextInput
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          placeholder="Password..."
          placeholderTextColor="#95a5a6"
          style={styles.InputField}
        />
        <TextInput
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }
          secureTextEntry={true}
          placeholder="Confirm Password..."
          placeholderTextColor="#95a5a6"
          style={styles.InputField}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Pressable style={styles.btn}>
          <Button onPress={signUp} title="Sign Up" />
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center" }}>
        <Text style={{ color: "#2c3e50", marginRight: 5 }}>
          Have you account?
        </Text>
        <Pressable onPress={() => navigation.navigate("Sign In")}>
          <Text style={{ color: "#2980b9" }}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;
