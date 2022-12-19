const safeArr = <T>(arr?: T[] | null) => {
  if (Array.isArray(arr)) {
    return arr;
  }
  return [];
};

export default safeArr;
