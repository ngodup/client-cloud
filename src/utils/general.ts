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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
    hour12: false,
  };

  // Format the date directly with desired separators
  const formattedDate = date
    .toLocaleString("fr-FR", options)
    .replace(",", " à ");

  return formattedDate;
};
