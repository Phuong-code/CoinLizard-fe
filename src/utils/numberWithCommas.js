// Converts a number to a string and formats it with commas as thousand separators.
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
