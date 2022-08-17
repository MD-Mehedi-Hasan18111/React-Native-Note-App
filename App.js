import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import SignIn from "./src/screen/SignIn";
import SignUp from "./src/screen/SignUp";
import Home from "./src/screen/Home";
import initializeAuthentication from "./src/Firebase/firebase.init";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CreateNote from "./src/screen/CreateNote";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);

  initializeAuthentication();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        setLoading(false);
      } else {
        setUser({});
        setIsLoggedIn(false);
        setLoading(false);
      }
    });
  }, [auth]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} /> */}
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create Note">
              {(props) => <CreateNote {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Sign In" component={SignIn} />
            <Stack.Screen name="Sign Up" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}