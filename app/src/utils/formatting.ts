import { fromWei } from "@openformat/react";

export function weiToNumber(
  amount: string = "0",
  fractionDigits: number = 0
): string {
  return Number(fromWei(amount ?? 0)).toFixed(fractionDigits);
}
