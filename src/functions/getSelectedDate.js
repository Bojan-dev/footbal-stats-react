const getSelectedDate = (date, change = false, changeUp) => {
  const toDateFormat = new Date(date);

  if (change) {
    changeUp
      ? toDateFormat.setDate(toDateFormat.getDate() + 1)
      : toDateFormat.setDate(toDateFormat.getDate() - 1);
  }

  const offset = toDateFormat.getTimezoneOffset();

  const finalDate = new Date(toDateFormat.getTime() - offset * 60 * 1000);

  return finalDate.toISOString().split('T')[0];
};

export default getSelectedDate;
