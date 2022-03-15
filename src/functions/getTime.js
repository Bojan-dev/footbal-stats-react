const getTime = (date) => {
  return `${String(new Date(date).getHours()).padStart(2, '0')}:${String(
    new Date(date).getMinutes()
  ).padStart(2, '0')}`;
};

export default getTime;
