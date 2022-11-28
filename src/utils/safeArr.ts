const safeArr = <T>(arr?: T[]) => {
  if (Array.isArray(arr)) {
    return arr;
  }
  return [];
};

export default safeArr;
