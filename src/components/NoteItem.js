import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "../styles/AllStyle";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

const NoteItem = ({ item }) => {
  const db = getFirestore();

  return (
    <View style={styles.noteItem}>
      <Text style={{ color: "white", fontSize: 16 }}>{item.note}</Text>
      <Pressable
        onPress={() => {
          deleteDoc(doc(db, "notes", item.id));
        }}
      >
        <AntDesign name="delete" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default NoteItem;
