import { MyBig } from '@/lib/big';

export const toCents = (value: number) => {
  return MyBig(value).mul(100).round(2).toNumber();
};

export const toCurrency = (value: number) => {
  return MyBig(value).div(100).round(2).toNumber();
};

export const toCurrencyFromCents = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(toCurrency(value));
};
