const getFormattedDate = (date) => {
  const dateFormatted = date.replace('T', '-').split('-');

  return `${dateFormatted[2]}.${dateFormatted[1]}.${dateFormatted[0]}`;
};

export default getFormattedDate;
