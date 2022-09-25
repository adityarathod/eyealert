import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { NativeRouter, Route, Routes, Link } from "react-router-native";
import Graphs from "./Graphs";
import Login from "./Login";

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/graphs" element={<Graphs />} />
      </Routes>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF2FF",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#2C8EFF",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
