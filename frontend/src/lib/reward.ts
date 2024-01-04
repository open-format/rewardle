import apiClient from "./apiClient";

export function triggerReward(action: string){
  return apiClient
    .post("rewards/token-system/trigger", {
      user_address: localStorage.getItem("address"),
      action_id: action
    })
    .catch((err) => console.log({ err }));
}