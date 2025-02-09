let counter = 0;

export function getCounter(): number {
  return counter;
}

export function increment(): number {
  counter++;
  return counter;
}

export function decrement(): number {
  counter--;
  return counter;
}