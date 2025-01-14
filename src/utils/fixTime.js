export function fixTime(runtime) {
    let stringToNum = Number(runtime.split(" ")[0])
    let hours = Math.floor(stringToNum / 60);
    let mins = stringToNum - (hours * 60);
    return hours + "h " + mins +"m";
  }
