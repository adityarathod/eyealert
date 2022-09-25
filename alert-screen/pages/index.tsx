import type { NextPage } from "next";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { library, playSoundSequence, load, stopAll } from "../audio";
import pusher from "../realtime/pusher";
import convertBackend, { BackendMessage } from "../realtime/types";
import averageLast3Blinks from "../focus-analytics/average";
import { FocusData } from "../focus-analytics/types";
import { firestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const initialFocusData: FocusData = {
  interblinkTimes: [],
  numAlerts: 0,
  endTime: 0,
};

const Home: NextPage = () => {
  const [attentive, setAttentive] = useState(true);
  let x = 0;
  const [focusData, setFocusData] = useState<FocusData>(initialFocusData);

  const markEnd = async () => {
    const committedData = focusData;
    if (focusData.interblinkTimes.length > 0) {
      committedData.endTime =
        Math.floor(
          Date.now() -
            focusData.interblinkTimes[focusData.interblinkTimes.length - 1] *
              1000
        ) / 1000;
    } else {
      committedData.endTime = Math.floor(Date.now() / 1000);
    }
    const res = await addDoc(
      collection(firestore, "procedures"),
      committedData
    );
    console.log(res);
    alert("Procedure upload complete!");
    setFocusData(initialFocusData);
  };

  useEffect(() => {
    load();
    const handleMessage = (data: BackendMessage) => {
      const msg = convertBackend(data);
      const newData = { ...focusData };
      newData.interblinkTimes.push(msg.lastBlink);
      const last3 = averageLast3Blinks(newData.interblinkTimes);
      console.log("Average of last 3 blinks: " + last3);
      if (last3 <= 0.3) {
        setAttentive(false);
        newData.numAlerts++;
        x++;
      } else {
        setAttentive(true);
      }
      console.log(newData);
      console.log(x);
      setFocusData(newData);
    };
    pusher.bind("event", handleMessage);
  }, []);

  useEffect(() => {
    if (attentive) stopAll();
    else {
      playSoundSequence([
        library.attention,
        library.focusWarning,
        library.focusWarning,
        library.warning,
      ]);
    }
  }, [attentive]);

  return (
    <div
      className={classNames(
        "w-screen",
        "h-screen",
        "flex",
        "items-center",
        "justify-center",
        attentive ? "bg-green-500" : "bg-red-500",
        "text-white",
        attentive ? "animate-none" : "animate-blink"
      )}
    >
      <h1
        className="text-9xl font-bold"
        onClick={() => setAttentive(!attentive)}
      >
        {attentive ? "system normal" : "attention alert!"}
      </h1>

      <div className="absolute bottom-0 right-0 p-4" onClick={() => markEnd()}>
        <button className="text-black bg-yellow-400 py-2 px-4 rounded-full font-semibold hover:bg-yellow-500">
          End procedure
        </button>
      </div>
    </div>
  );
};

export default Home;
