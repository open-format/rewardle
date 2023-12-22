import apiClient from "@/utils/apiClient";
import { useWallet } from "@openformat/react";

const Home = () => {
  const { address } = useWallet();

  async function handleRewards() {
    await apiClient
      .post("rewards/token-system/trigger", {
        user_address: address,
        action_id: "test_action",
      })
      .then((data) => console.log({ data }));
  }

  return (
    <section>
      {/* Game */}
      <h2>Game</h2>
      <button onClick={handleRewards}>Trigger Action</button>
    </section>
  );
};

export default Home;
