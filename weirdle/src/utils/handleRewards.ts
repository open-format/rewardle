import { toast } from "react-toastify";
import apiClient from "./apiClient";

function checkActivityType(rewards) {
  const activityTypes = rewards.map((reward) => reward.activityType);
  if (activityTypes.includes("ACTION") && !activityTypes.includes("MISSION")) {
    toast.success("You just received XP!");
  } else if (activityTypes.includes("MISSION")) {
    toast.success("You just received XP and $WORDLE!");
  }
}

async function handleRewards(address: string, action_id: string) {
  await apiClient
    .post("rewards/token-system/trigger", {
      user_address: address,
      action_id: action_id,
    })
    .then((res) => checkActivityType(res.data.rewards))
    .catch((err) => console.log({ err }));
}

export default handleRewards;
