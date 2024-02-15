import { toWei } from "@openformat/sdk";
import { sdk } from "../services/SDK";

export async function updateBalance(address: string) {
  const tx = await sdk.signer?.sendTransaction({
    to: address,
    value: toWei("0.5"),
  });

  return tx;
}
