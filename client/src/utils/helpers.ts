export const swapElements = (arr: any[], addedIndex: number, removedIndex: number) => {
  const temp = arr[addedIndex]; //Todo give a meaning to this temp variable.
  arr[addedIndex] = arr[removedIndex];
  arr[removedIndex] = temp;
  return arr;
};
