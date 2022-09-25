export interface BackendMessage {
  // time since last blink (small numbers == eyes closed)
  message: number;
}

export interface BlinkMessage {
  lastBlink: number;
}

export default function convertBackend(msg: BackendMessage): BlinkMessage {
  return {
    lastBlink: msg.message,
  };
}
