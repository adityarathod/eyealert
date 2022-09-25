import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Pressable,
} from "react-native";
export default function Card(props) {
    return (
        <View style={{ height: 250, marginBottom: 30 }}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "#ffffff",

                    width: 350,

                    shadowColor: "#171717",
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                }}
            >{props.children}</View>
        </View>
    );
}
