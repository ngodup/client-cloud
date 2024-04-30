export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  return formatter.format(price);
};

export const visit = (url: string) => {
  window.location.href = url;
};
