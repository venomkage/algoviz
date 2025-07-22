export function bubbleSortSteps(originalArray: number[]): number[][] {
  const steps: number[][] = [];
  const arr = [...originalArray]; // clone to avoid mutating original

  steps.push([...arr]); // initial state

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push([...arr]); // save state after swap
      }
    }
  }

  return steps;
}
