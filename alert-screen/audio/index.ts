class SoundFile {
  audio: HTMLAudioElement;
  playing = false;
  constructor(fileName: string) {
    this.audio = new Audio(fileName);
  }
  play() {
    return new Promise<void>((resolve, reject) => {
      try {
        this.playing = true;
        this.audio.play();
        this.audio.addEventListener("ended", () => resolve());
      } catch (err) {
        console.error(err);
        reject(err);
      }
      this.playing = false;
    });
  }

  stop() {
    if (this.playing) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.playing = false;
    }
  }
}

interface SoundLibrary {
  attention: SoundFile;
  focusWarning: SoundFile;
  warning: SoundFile;
}

export let library: SoundLibrary;

export function load() {
  if (!library) {
    library = {
      attention: new SoundFile("/audio/Attention.wav"),
      focusWarning: new SoundFile("/audio/Focus Warning.wav"),
      warning: new SoundFile("/audio/Warning.wav"),
    };
  }
}

export function stopAll() {
  library.attention.stop();
  library.focusWarning.stop();
  library.warning.stop();
}

export async function playSoundSequence(sounds: SoundFile[]) {
  for (const sound of sounds) {
    await sound.play();
  }
}
