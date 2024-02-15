import { toast } from "react-toastify";
import apiClient from "./apiClient";

function checkActivityType(rewards) {
  const activityTypes = rewards.map((reward) => reward.activityType);
  if (activityTypes.includes("ACTION") && !activityTypes.includes("MISSION")) {
    return toast.success("You just received XP!");
  } else if (activityTypes.includes("MISSION")) {
    return toast.success("You just received XP and $WORDLE!");
  }
}

async function handleRewards(
  address: string,
  action_id: string,
  callback?: () => void
) {
  await apiClient
    .post("rewards/token-system/trigger", {
      user_address: address,
      action_id: action_id,
    })
    .then((res) => {
      checkActivityType(res.data.rewards);

      if (callback) {
        // @DEV We need to add a slight delay here due to subgraph being slightly behind.
        // This will get better with time.
        setTimeout(() => callback(), 500);
      }
    })
    .catch((err) => console.log({ err }));
}

export default handleRewards;
