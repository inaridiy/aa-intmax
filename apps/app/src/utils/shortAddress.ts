export const shortAddress = (address?: string | null) => {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "...";
};
