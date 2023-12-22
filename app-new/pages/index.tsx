import { MissionConfig } from "@/@types";
import { useProfileStore } from "@/stores";
import apiClient from "@/utils/apiClient";
import { useOpenFormat, useWallet } from "@openformat/react";
import { useEffect, useState } from "react";

const Home = () => {
  const { address } = useWallet();
  const { sdk } = useOpenFormat();
  const { profileData, setProfileData } = useProfileStore();
  const [quests, setQuests] = useState<MissionConfig[]>();

  async function handleAuth() {
    try {
      const res = await apiClient.post("auth/challenge", {
        eth_address: address,
      });
      const signedMessage = await sdk.signer?.signMessage(
        res.data.challenge
      );

      await apiClient
        .post("auth/verify", {
          eth_address: address,
          signature: signedMessage,
        })
        .then((res) => localStorage.setItem("token", res.data.token));

      await apiClient
        .get("profile/me")
        .then((res) => {
          setProfileData(res.data.data);
          console.log({ res: res.data });
        })
        .catch(() => handleAuth());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const tokenExists = localStorage.getItem("token");

    async function fetchProfile() {
      await apiClient
        .get("profile/me")
        .then((res) => {
          setProfileData(res.data.data);
          console.log({ res: res.data });
        })
        .catch(() => handleAuth());
    }

    if (address && !tokenExists) {
      handleAuth();
    } else if (address && tokenExists) {
      fetchProfile();
    }

    async function fetchQuests() {
      await apiClient
        .get("/missions")
        .then((res) => setQuests(res.data.missions));
    }

    fetchQuests();
  }, [address]);
  return (
    <>
      <section>
        {/* Profile */}
        <h2>Profile</h2>
        {profileData && (
          <ul>
            <li>Address: {profileData?.eth_address}</li>
            <li>name: {profileData?.name}</li>
            <li>email: {profileData?.email}</li>
            <li>Total XP: {profileData?.xp_balance}</li>
            <li>Total $WORD: {profileData?.reward_token_balance}</li>
          </ul>
        )}
      </section>
      <section id="achievements">
        <h2>Your Completed Quests</h2>

        <article className="achievement">
          {quests
            ?.filter((quest) =>
              profileData?.completed_missions.some(
                (completedMission) =>
                  completedMission.metadata.name === quest.id
              )
            )
            .map((quest) => (
              <>
                <section className="achievement-content">
                  <h3>{quest.id}</h3>
                  <p>{quest.description}</p>
                  <div className="payload">
                    <p>
                      <strong>XP Earned:</strong>{" "}
                      {quest.tokens[0].amount} XP
                    </p>
                    <p>
                      <strong>Reward:</strong> $WORD{" "}
                      {quest.tokens[1].amount}
                    </p>
                  </div>
                </section>
                <div className="badges">
                  <img
                    src={quest.badgeUrl}
                    style={{ width: 250, borderRadius: "100%" }}
                    alt="Badge 1 for Achievement 1"
                  />
                </div>
                <section className="actions">
                  <h4>Completed Actions</h4>
                  <ul>
                    {quest.requirements.map((requirement, i) => (
                      <li key={requirement.actionId + i}>
                        <span className="action-title">
                          {requirement.actionId}
                        </span>
                        <span className="action-description">
                          {requirement.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            ))}
        </article>
      </section>
    </>
  );
};

export default Home;
