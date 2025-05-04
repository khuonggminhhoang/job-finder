export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomChar(): string {
  return String.fromCharCode(random(33, 126));
}

export function randomString(size: number): string {
  let randomResult = '';
  while (size--) randomResult += randomChar();
  return randomResult;
}

export function randomAlphabet(stringLength: number) {
  let randomString = '';
  const rd = () => {
    let rd = random(65, 122);
    if (90 < rd && rd < 97) rd += 10;
    return rd;
  };
  while (stringLength--) {
    randomString += String.fromCharCode(rd());
  }
  return randomString;
}
