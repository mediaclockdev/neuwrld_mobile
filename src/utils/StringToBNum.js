export const parsePriceToNumber = (value) => {
  if (!value) return 0;

  return Number(
    value
      .toString()
      .replace(/[^0-9.]/g, '') // remove $, commas, spaces
  );
};
