function sum(arr: number[]) {
  return arr.reduce((p, c) => {
    return p + c;
  });
}

export default function averageLastBlinks(interblinkTimes: number[]) {
  if (interblinkTimes.length <= 3) {
    return sum(interblinkTimes) / interblinkTimes.length;
  } else {
    return sum(interblinkTimes.slice(interblinkTimes.length - 3)) / 3;
  }
}
