import apiClient from "./apiClient";

async function handleRewards(address: string, actoion_id: string) {
  await apiClient
    .post("rewards/token-system/trigger", {
      user_address: address,
      action_id: actoion_id,
    })
    .then((res) =>
      console.log(`Success!, View transaction: ${res.data.transaction}`)
    )
    .catch((err) => console.log({ err }));
}

export default handleRewards;
