export const swapElements = (arr: any[], addedIndex: number, removedIndex: number) => {
  const temp = arr[addedIndex];
  arr[addedIndex] = arr[removedIndex];
  arr[removedIndex] = temp;
  return arr;
};
