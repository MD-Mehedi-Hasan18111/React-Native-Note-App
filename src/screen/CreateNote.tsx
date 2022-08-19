import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import initializeAuthentication from "../Firebase/firebase.init";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { UIDProps } from "../Types/types";

const CreateNote: React.FC<UIDProps> = ({ uid }) => {
  const app = initializeAuthentication();

  const navigation = useNavigation();

  const db = getFirestore(app);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  // console.log(user.uid);

  const addNote = async () => {
    setIsLoading(true);
    try {
      setIsLoading(false);
      const docRef = await addDoc(collection(db, "notes"), {
        note: note,
        uid: uid,
      });
      navigation.goBack();
      Alert.alert("Note created successfully");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Write your Note</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          placeholder="Write Note..."
          placeholderTextColor="gray"
          multiline={true}
          style={styles.noteInput}
          onChangeText={(note) => setNote(note)}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Pressable>
          <Button onPress={addNote} title="Submit" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "500",
    color: "#2980b9",
    marginBottom: 20,
  },
  noteInput: {
    borderWidth: 2,
    borderColor: "#2980b9",
    width: 280,
    height: 50,
    paddingHorizontal: 20,
  },
});

export default CreateNote;
