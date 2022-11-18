const formatLeagueName = (name) => {
  let nameFormatted;

  const nameSplited = name.split(' ');

  nameSplited.forEach((namePart) => {
    if (namePart.toUpperCase()[0] !== namePart[0]) return;

    nameFormatted = !nameFormatted ? namePart[0] : nameFormatted + namePart[0];
  });

  return nameFormatted;
};

export default formatLeagueName;
