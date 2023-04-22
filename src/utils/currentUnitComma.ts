interface ICurrentUnitComma {
  money: number;
}

export const moneyWithComma = (money: ICurrentUnitComma) => {
  const moneyWithComma = money
    .toString()
    .split("")
    .reverse()
    .map((val, idx) => (idx % 3 === 0 && idx !== 0 ? val + "," : val))
    .reverse()
    .join("");

  return moneyWithComma;
};
