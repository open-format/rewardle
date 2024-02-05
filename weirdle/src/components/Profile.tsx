import { useQuery } from "@tanstack/react-query";
import { ProfileData } from "../@types";
import { useProfileStore } from "../stores/index";
import apiClient from "../utils/apiClient";
import { IconButton } from "./Button";
import { useState } from "react";
import { toast } from "react-toastify";
import handleRewards from "../utils/handleRewards";

export default function Profile() {
  const { setProfileData } = useProfileStore();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: fetchProfileData,
  });

  async function fetchProfileData(): Promise<ProfileData> {
    return await apiClient
      .get("profile/me")
      .then((res) => {
        setProfileData(res.data.data);
        return res.data.data;
      })
      .catch((err) => console.log({ err }));
  }

  if (isLoading)
    return (
      <div aria-live="assertive" aria-busy="true">
        Loading...
      </div>
    );

  return (
    <section id="profile">
      <h2>Your Profile</h2>
      {profileData && (
        <div className="user-data">
          <div className="user-data-details">
            <figcaption id="user-name">
              <NicknameUpdater profileData={profileData} />
            </figcaption>
            <p id="user-email">{profileData?.email}</p>
            <p id="user-wallet">{profileData?.eth_address}</p>
          </div>
          <div className="user-data-wallet-scores">
            <ul id="user-tokens">
              <li>
                <strong>Total XP:</strong> {profileData?.xp_balance}
              </li>
              <li>
                <strong>Total Reward Token:</strong>{" "}
                {profileData?.reward_token_balance}
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

function NicknameUpdater({ profileData }: { profileData: ProfileData }) {
  const [nickname, setNickname] = useState<string>("NICKNAME");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasUpdated, setHasUpdated] = useState<boolean>(false);

  function handleNicknameChange(e: any) {
    setNickname(e.target.value);
  }

  async function handleNicknameUpdate() {
    try {
      if (nickname.length <= 2) {
        throw new Error("Nickname must be at least 3 characters long");
      }
      setIsEditing(false);
      const isFirstUpdate = !Boolean(profileData.nickname);
      await apiClient
        .put("profile/me", {
          eth_address: profileData.eth_address,
          nickname: nickname,
        })
        .then(async () => {
          toast.success("nickname updated");
          setHasUpdated(true);

          if (isFirstUpdate) {
            await handleRewards(profileData.eth_address, "add_nickname");
          }
        });
    } catch (e: any) {
      if (e?.response?.data?.reason) {
        toast.error(e.response.data.reason);
      } else {
        toast.error(e.message);
      }
      setNickname(profileData?.nickname ?? "NICKNAME");
      setIsEditing(false);
    }
  }

  function handleKeyPress(e: any) {
    if (e.key === "Enter") {
      handleNicknameUpdate();
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center space-x-1 lg:justify-start">
        {isEditing ? (
          <input
            value={nickname}
            onFocus={() => setNickname("")}
            onChange={handleNicknameChange}
            onBlur={handleNicknameUpdate}
            onKeyDown={handleKeyPress}
            autoFocus
            className="font-pixel w-full bg-transparent font-bold uppercase outline-none"
          />
        ) : (
          <p className="whitespace-nowrap" onClick={() => setIsEditing(true)}>
            {profileData?.nickname && !isEditing && !hasUpdated
              ? profileData?.nickname
              : nickname}
          </p>
        )}
        {!isEditing && (
          <IconButton className="" onClick={() => setIsEditing(true)} />
        )}
      </div>
    </div>
  );
}
