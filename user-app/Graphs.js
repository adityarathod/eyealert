import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";
import Card from "./Card";
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import dayjs from "dayjs";

// Initialize Firebase

let app = initializeApp(firebaseConfig);

export default function App() {
    const [fall, setFall] = useState(null);
    const stt = dayjs().subtract(1, 'minute');
    useEffect(() => {
        (async () => {
            const db = getFirestore(app);
            const querySnapshot = await getDocs(collection(db, "procedures"));
            const doc = querySnapshot.docs[0];
            console.log(`${doc.id} => ${doc.data()}`);
            const data = doc.data();
            const ibc = data.interblinkTimes;
            let hi = [];
            for (let i = 0; i < ibc.length - 3; i++) {
                if (ibc[i] <= 0.3 && ibc[i + 1] <= 0.3 && ibc[i + 2] <= 0.3) {
                    hi.push(i);
                }
            }
            let curr = hi[0];
            let start = hi[0];
            let groups = [];
            for (let i = 1; i < hi.length; i++) {
                if (curr + 1 != hi[i]) {
                    groups.push([start, curr]);
                    start = hi[i];
                }
                curr = hi[i];
            }
            groups.push([start, curr]);
            let groupTimes = [];
            let counter = 0;
            for (let i = 0; i < groups.length; i++) {
                counter = 0;
                for (let j = 0; j < groups[i][0]; j++) {
                    counter += ibc[j];
                }
                const currStart = stt.add(counter * 1000, 'ms');
                counter = 0;
                for (let j = groups[i][0]; j <= groups[i][1]; j++) {
                    counter += ibc[j];
                }
                const currEnd = currStart.add(counter * 1000, 'ms');
                groupTimes.push([currStart.valueOf(), currEnd.valueOf()]);
            }
            console.log(groups);
            console.log(groupTimes);
        })();
    }, []);
    return (
        <View style={styles.container}>
            <Image
                source={require("./assets/EyeAlertLogo.png")}
                style={{
                    width: 150,
                    height: 150,
                    marginTop: 30,
                    marginBottom: 10,
                }}
            />
            <Text
                style={{
                    fontSize: 36,
                    fontWeight: "bold",
                    alignSelf: "flex-start",
                    marginLeft: 20,
                    marginTop: -10,
                    marginBottom: 30,
                }}
            >
                Welcome, <Text style={{ color: "#2C8EFF" }}>John</Text>!
            </Text>
            <View style={styles.container}>
                <Card>
                    <ScrollView>
                        <Text
                            style={{
                                alignSelf: "center",
                                color: "#2C8EFF",
                                fontSize: 27,
                                marginTop: 15,
                            }}
                        >
                            Your last surgery
                        </Text>
                        {fall ? (
                            fall.map((f) => <></>)
                        ) : (
                            <Text style={{ textAlign: "center" }}>
                                Loading...
                            </Text>
                        )}
                    </ScrollView>
                </Card>
                <Card />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#EAF2FF",
    },
});
