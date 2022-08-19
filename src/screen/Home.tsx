import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import styles from "../styles/AllStyle";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import initializeAuthentication from "../Firebase/firebase.init";
import NoteItem from "../components/NoteItem";
import { HomeProps, noteListProps } from "../Types/types";

const Home: React.FC<HomeProps> = ({ navigation, uid, email }) => {
  const auth = getAuth();
  const app = initializeAuthentication();
  const db = getFirestore(app);
  const [noteList, setNoteList] = useState<noteListProps>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // query
    const q = query(collection(db, "notes"), where("uid", "==", uid));

    // listener
    const noteListener = onSnapshot(q, (querySnapShot) => {
      const container: any = [];
      querySnapShot.forEach((doc) => {
        container.push({ ...doc.data(), id: doc.id });
      });
      setNoteList(container);
      setIsLoading(false);
    });

    return noteListener;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  // user logout
  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <View style={{ paddingBottom: 20 }}>
      <View style={styles.HomeHeader}>
        <Text style={{ color: "#fff", fontSize: 16 }}>{email}</Text>
        <Pressable style={styles.logOutBtn}>
          <Button onPress={logOut} title="Log Out" />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 15,
        }}
      >
        <Text style={styles.headingStyle}>Add Note</Text>
        <Pressable onPress={() => navigation.navigate("Create Note")}>
          <AntDesign name="pluscircleo" size={40} color="#2980b9" />
        </Pressable>
      </View>
      <ScrollView style={{ marginTop: 30, paddingHorizontal: 20 }}>
        {noteList?.length > 0 ? (
          noteList?.map((note: any, index: number) => (
            <NoteItem key={index} item={note} />
          ))
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            Empty Notes!
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
