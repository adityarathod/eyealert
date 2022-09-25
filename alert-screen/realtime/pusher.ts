import Pusher from "pusher-js";

Pusher.logToConsole = true;

let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_ID || "NA", {
  cluster: "us2",
});

let channel = pusher.subscribe("events");
export default channel;
