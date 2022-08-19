import React, { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import styles from "../styles/AllStyle";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { navigationProps } from "../Types/types";

const SignIn: React.FC<navigationProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = getAuth();

  const signIn = () => {
    if (email != "" && password != "") {
      if (password.length >= 6) {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential.user.email);
          })
          .catch((err) => {
            Alert.alert(err.message);
          });
      } else {
        Alert.alert("Password must be at least 6 character");
      }
    } else {
      Alert.alert("Input field must be fill up");
    }
  };

  return (
    <View>
      <View style={styles.headerDiv}>
        <Text style={styles.headingStyle}>Sign In</Text>
        <Text style={{ fontSize: 16, color: "#000" }}>
          Sign in and create your notes!
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
      </View>

      <View style={{ marginTop: 20 }}>
        <Pressable style={styles.btn}>
          <Button onPress={signIn} title="Sign In" />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#2c3e50", marginRight: 5 }}>
          Don't have account?
        </Text>
        <Pressable onPress={() => navigation.navigate("Sign Up")}>
          <Text style={{ color: "#2980b9" }}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
