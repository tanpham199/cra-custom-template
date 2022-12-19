const fillInSingleNumber = (number: number) => (number < 10 ? `0${number}` : number);

const formatDate = (timestamp?: string | number | Date | null) => {
  if (
    typeof timestamp !== 'string' &&
    typeof timestamp !== 'number' &&
    !(timestamp instanceof Date)
  ) {
    return '';
  }
  const date = new Date(timestamp);
  const day = fillInSingleNumber(date.getDate());
  const month = fillInSingleNumber(date.getMonth() + 1);

  return `${day}/${month}/${date.getFullYear()}`;
};

export default formatDate;
