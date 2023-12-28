import Welcome from "@/components/Welcome";
import apiClient from "@/utils/apiClient";
import { useWallet } from "@openformat/react";
import { useState } from "react";

export default function PlayPage() {
  const { address } = useWallet();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleRewards() {
    setIsLoading(true);
    await apiClient
      .post("rewards/token-system/trigger", {
        user_address: address,
        action_id: "test_action",
      })
      .then((res) =>
        alert(`Success!, View transaction: ${res.data.transaction}`)
      )
      .catch((err) => console.log({ err }));
    setIsLoading(false);
  }

  return (
    <section>
      <Welcome handleRewards={handleRewards} isLoading={isLoading} />
    </section>
  );
}
