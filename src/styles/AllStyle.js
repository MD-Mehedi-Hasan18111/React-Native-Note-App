import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerDiv: {
    marginVertical: 20,
    paddingLeft: 20,
  },
  headingStyle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2980b9",
  },
  formDiv: {
    paddingHorizontal: 20,
  },
  InputField: {
    borderBottomWidth: 2,
    borderBottomColor: "#2980b9",
    width: "100%",
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "#2980b9",
    fontSize: 18,
    color: "#fff",
    width: 320,
    borderRadius: 12,
    marginLeft: 20,
  },
  HomeHeader: {
    backgroundColor: "#2980b9",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logOutBtn: {
    borderWidth: 2,
    borderColor: "#fff",
    padding: 8,
    borderRadius: 5,
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2980b9",
    width: 320,
    padding: 15,
    marginVertical: 15,
    borderRadius: 10
  },
});

export default styles;
