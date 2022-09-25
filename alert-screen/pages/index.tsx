import type { NextPage } from "next";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { library, playSoundSequence, load, stopAll } from "../audio";

const Home: NextPage = () => {
  const [attentive, setAttentive] = useState(true);

  useEffect(() => {
    load();
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
      onClick={() => setAttentive(!attentive)}
    >
      <h1 className="text-9xl font-bold">
        {attentive ? "system normal" : "attention alert!"}
      </h1>
    </div>
  );
};

export default Home;
