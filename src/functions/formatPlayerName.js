const formatPlayerName = (name) => {
  let nameFormatted;

  const nameSplited = name.split(' ');

  if (nameSplited.length === 1) return name;

  nameSplited.forEach((namePart) => {
    nameFormatted =
      namePart === nameSplited.at(-1)
        ? `${nameFormatted || ''} ${namePart}`
        : namePart === nameSplited[0]
        ? `${namePart[0]}.`
        : namePart !== ''
        ? `${nameFormatted} ${namePart[0]}.`
        : nameFormatted;
  });

  return nameFormatted;
};

export default formatPlayerName;
