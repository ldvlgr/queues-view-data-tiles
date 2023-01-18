
export function getAgentActivityCounts (workers = [], teams = []) {
  let activityCounts = {};

  //All Teams, init counts
  activityCounts["Other"] = { teamName: "Other", Available: 0, Unavailable: 0, Break: 0, Offline: 0 };
  teams.forEach((team) => {
      activityCounts[team] = { teamName: team, Available: 0, Unavailable: 0, Break: 0, "Clocked Out": 0 };
      workers.forEach((wk) => {
          let activity = wk.worker.activityName;
          let tm = wk.worker?.attributes?.team_name || "Other";
          if (team == tm) {
              let count = activityCounts[tm][activity] ? activityCounts[tm][activity] : 0;
              activityCounts[tm][activity] = count + 1;
          } else {
              let count = activityCounts.Other[activity] ? activityCounts.Other[activity] : 0;
              activityCounts.Other[activity] = count + 1;
          }
      });
  });
  return activityCounts;
  
}