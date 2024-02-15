import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { addressSplitter } from "utils/formatting";
import { ProfileData } from "../@types";
import { useProfileStore } from "../stores/index";
import apiClient from "../utils/apiClient";
import handleRewards from "../utils/handleRewards";
import { IconButton } from "./Button";

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
    <section>
      <h2>Your Profile</h2>
      {profileData && (
        <div className="flex justify-between rounded border p-2">
          <div>
            <figcaption>
              <NicknameUpdater profileData={profileData} />
            </figcaption>
          </div>
          <div>
            <ul>
              <li>
                <p>{addressSplitter(profileData?.eth_address)}</p>
              </li>
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
            await handleRewards(profileData.eth_address, "add_name");
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
      <div className="flex items-center justify-center space-x-1 text-2xl font-bold lg:justify-start">
        {isEditing ? (
          <input
            value={nickname}
            onFocus={() => setNickname("")}
            onChange={handleNicknameChange}
            onBlur={handleNicknameUpdate}
            onKeyDown={handleKeyPress}
            autoFocus
            className="w-full bg-transparent outline-none"
          />
        ) : (
          <p
            className="whitespace-nowrap text-2xl"
            onClick={() => setIsEditing(true)}
          >
            {profileData?.nickname && !isEditing && !hasUpdated
              ? profileData?.nickname
              : nickname}
          </p>
        )}
        {!isEditing && (
          <IconButton>
            <PencilSquareIcon
              className="h-8 w-8"
              onClick={() => setIsEditing(true)}
            />
          </IconButton>
        )}
      </div>
    </div>
  );
}
