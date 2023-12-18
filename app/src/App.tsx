import { ConnectButton, useWallet } from "@openformat/react";
import Leaderboard from "components/Leaderboard";
import * as React from "react";
import { MissionConfig, User } from "../@types";
import "./styles/global.css";

export default () => {
  const { address } = useWallet();
  const [quests, setQuests] = React.useState<MissionConfig[]>();
  const [profileData, setProfileData] = React.useState<User>();

  async function handleRewards() {
    await fetch(
      process.env.API_URL + "/rewards/token-system/trigger",
      {
        method: "POST",
        body: JSON.stringify({
          user_address: address,
          action_id: "test_action",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log({ data }));
  }

  React.useEffect(() => {
    async function fetchQuests() {
      await fetch(process.env.API_URL + "/missions")
        .then((res) => res.json())
        .then((data) => setQuests(data.missions));
    }

    async function fetchProfile() {
      await fetch(process.env.API_URL + "/profile/me")
        .then((res) => res.json())
        .then((data) => setProfileData(data));
    }

    fetchQuests();
    fetchProfile();
  }, []);
  return (
    <>
      <ConnectButton />
      <h1>Welcome to OPENFORMAT GetStarted!</h1>
      {/* Profile */}
      <section>
        <h2>Profile</h2>
        <ul>
          <li>Address: {profileData?.eth_address}</li>
          <li>name: {profileData?.name}</li>
          <li>email: {profileData?.email}</li>
          <li>Total XP: {profileData?.xp_balance}</li>
          <li>Total $WORD: {profileData?.reward_token_balance}</li>
        </ul>
      </section>
      {/* Game */}
      <section>
        <h2>Game</h2>
        <button onClick={handleRewards}>Trigger Action</button>
      </section>
      {/* Quests */}
      <section aria-labelledby="quests-heading">
        <h2 id="quests-heading">Quests</h2>
        <ul>
          {quests?.map((quest, index) => (
            <li key={`quest-${index}`}>
              <article>
                <h3>{quest.id}</h3>
                <p>{quest.description}</p>
                <div>
                  <h4>Requirements</h4>
                  <ul>
                    {quest.requirements.map(
                      (requirement, reqIndex) => (
                        <li key={`requirement-${index}-${reqIndex}`}>
                          {requirement.actionId}: {requirement.count}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
      {/* Achievements */}
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
                    {quest.requirements.map((requirement) => (
                      <li>
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
      <Leaderboard />
    </>
  );
};
