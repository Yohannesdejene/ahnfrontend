function StringToBoolean(str: string): boolean {
  const truePattern: RegExp = /^(true|yes|1)$/i;
  const falsePattern: RegExp = /^(false|no|0)$/i;

  if (truePattern.test(str)) {
    return true;
  } else if (falsePattern.test(str)) {
    return false;
  } else {
    throw new Error("Invalid boolean string");
  }
}
export default StringToBoolean;
