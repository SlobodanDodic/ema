export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "RSD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
