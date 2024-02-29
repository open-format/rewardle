import { Hono } from "hono";
import MISSIONS from "../../../constants/missions";
import { getOnChainProfile } from "../../../utils/profile";

enum Status {
  SUCCESS = "success",
  FAILED = "failed",
}

const missions = new Hono();

missions.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ status: Status.FAILED, message: err.message }, 500);
});

missions.get("/", async (c) => {
  const { user } = c.req.query();
  let missions = MISSIONS;

  if (user) {
    const onChainProfile = await getOnChainProfile(user);

    missions = checkMissionCompletion(
      onChainProfile.completed_missions,
      MISSIONS
    );
  }

  return c.json({ status: Status.SUCCESS, missions: missions });
});

const checkMissionCompletion = (completedMissions, missions) => {
  // Convert completedMissions to a Set for faster lookups
  const completedMissionIds = new Set(
    completedMissions.map((mission) => mission.metadata.name)
  );

  // Loop over missions and check if each one is completed
  const missionStatus = missions.map((mission) => {
    const isCompleted = completedMissionIds.has(mission.id);
    return {
      ...mission,
      completed: isCompleted,
    };
  });

  return missionStatus;
};

export default missions;
