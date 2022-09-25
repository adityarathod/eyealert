import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { useNavigate } from "react-router-native";

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
    paddingHorizontal: 20,
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

// hmmmmmmm
export function Button(props) {
  const { onPress, title = "Submit" } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export default function Login() {
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/EyeAlertLogo.png")}
        style={{ width: 250, height: 250 }}
      />

      <TextInput
        placeholder="Username"
        style={{
          backgroundColor: "#D8E7FF",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 130,
          paddingRight: 130,
          borderRadius: 10,
          margin: 10,
        }}
      />

      <TextInput
        placeholder="Password"
        style={{
          backgroundColor: "#D8E7FF",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 130,
          paddingRight: 130,
          borderRadius: 10,
          margin: 10,
          marginBottom: 30,
        }}
        secureTextEntry
      />

      <Button onPress={() => navigate("/graphs")}></Button>
    </View>
  );
}
