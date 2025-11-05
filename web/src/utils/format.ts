export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const calcDiscountedPrice = (price: number, discount: number) =>
  Math.round((price * (1 - discount / 100)) * 100) / 100;

export const getRatingStars = (rating: number) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return { full, half, empty: 5 - full - (half ? 1 : 0) };
};
