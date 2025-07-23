export function quickSortSteps(original: number[]): number[][] {
  const steps: number[][] = [];
  const arr = [...original];

  function quickSort(start: number, end: number) {
    if (start >= end) return;
    let pivot = arr[end];
    let i = start;

    for (let j = start; j < end; j++) {
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push([...arr]);
        i++;
      }
    }

    [arr[i], arr[end]] = [arr[end], arr[i]];
    steps.push([...arr]);

    quickSort(start, i - 1);
    quickSort(i + 1, end);
  }

  steps.push([...arr]); // initial
  quickSort(0, arr.length - 1);
  return steps;
}
