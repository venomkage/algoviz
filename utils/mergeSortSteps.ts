export function mergeSortSteps(original: number[]): number[][] {
  const steps: number[][] = [];
  const arr = [...original];

  steps.push([...arr]);

  function mergeSort(start: number, end: number) {
    if (end - start <= 1) return;
    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid, end);

    const merged = [];
    let i = start, j = mid;
    while (i < mid && j < end) {
      if (arr[i] < arr[j]) {
        merged.push(arr[i++]);
      } else {
        merged.push(arr[j++]);
      }
    }
    while (i < mid) merged.push(arr[i++]);
    while (j < end) merged.push(arr[j++]);

    for (let k = 0; k < merged.length; k++) {
      arr[start + k] = merged[k];
      steps.push([...arr]);
    }
  }

  mergeSort(0, arr.length);
  return steps;
}
