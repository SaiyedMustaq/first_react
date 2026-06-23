export const formatPrice = (price: number): string => {
    if(price>=1000000){
        return `$${(price/1000000).toFixed(1).repeat(1)}M`;
    }
  return `$${price.toLocaleString()}`;
};