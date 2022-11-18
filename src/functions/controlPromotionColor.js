const promotions = [
  {
    class: 'darkBlueBkg',
    competitions: ['Champions League'],
  },
  { class: 'brownBkg', competitions: ['Europa League'] },
  {
    class: 'redBkg',
    competitions: ['Europa Conference League'],
  },
];

const handlePromotionColor = (promotionLvl) => {
  if (!promotionLvl) return;

  for (let i = 0; i < promotions.length; i++) {
    if (
      promotions[i].competitions.some((comp) => promotionLvl.includes(comp))
    ) {
      return promotions[i].class;
    }
  }

  return 'lightRedBkg';
};

export default handlePromotionColor;
