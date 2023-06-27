import { Manager } from '@twilio/flex-ui';

const _manager = Manager.getInstance();
const workerActivities = _manager.store.getState().flex?.worker?.activities || new Map();

const STATUS_AVAILABLE = "Available";
const STATUS_BUSY = "Busy";
const STATUS_IDLE = "Idle";

export function getAgentStatusCounts(workers = [], teams = []) {
    //Version 2: Also consider if worker has tasks
    //If task count == 0, Status = "Idle"
    //If task count > 0, Status = "Busy" 
    let activityCounts = {};
    activityCounts["All"] = { teamName: "All", totalAgentCount: 0 };
    //Init activity counts
    teams.forEach((team) => {
        activityCounts[team] = { teamName: team, totalAgentCount: 0 };
        workerActivities.forEach((value, key) => {
            activityCounts[team][value.name] = 0;
            activityCounts["All"][value.name] = 0;
        });
    });

    //Aggregate Activity/Status by Team
    workers.forEach((wk) => {
        let workerStatus = wk.worker.activityName;
        let tm = wk.worker?.attributes?.team_name || "Other";
        if (workerStatus === STATUS_AVAILABLE) {
            // Determine Busy status (1+ tasks) vs. Idle (0 tasks)
            const tasks = wk?.tasks || [];
            workerStatus = STATUS_IDLE;
            if (tasks.length > 0) workerStatus = STATUS_BUSY
        }
        if (teams.includes(tm)) {
            let count = activityCounts[tm][workerStatus] ? activityCounts[tm][workerStatus] : 0;
            activityCounts[tm][workerStatus] = count + 1;
            activityCounts[tm].totalAgentCount += 1;
        }
        // Total Count for All Workers/Teams
        let count = activityCounts.All[workerStatus] ? activityCounts.All[workerStatus] : 0;
        activityCounts.All[workerStatus] = count + 1;
        activityCounts.All.totalAgentCount += 1;
    });

    return activityCounts;
}


export function getSkillsCounts(workers = [], teams = []) {
    let skillCounts = {};
    skillCounts["All"] = { };
    teams.forEach((team) => {
        skillCounts[team] = { };
    });
    //Aggregate Skills
    workers.forEach((wk) => {
        let tm = wk.worker?.attributes?.team_name || "Other";
        let wkSkills = wk.worker?.attributes?.routing?.skills || [];
        wkSkills.forEach((sk) => {
            if (teams.includes(tm)) {
                let count = skillCounts[sk][tm] ? skillCounts[sk][tm] : 0;
                skillCounts[sk][tm] = count + 1;
            }
            let count = skillCounts.All[sk] ? skillCounts.All[sk] : 0;
            skillCounts.All[sk] = count + 1;
        })
    });
    return skillCounts;
}

export function getSkillsByTeamCounts(workers = [], teams = []) {
    let skillCounts = {};
    //Aggregate Skills
    workers.forEach((wk) => {
        let tm = wk.worker?.attributes?.team_name || "Other";
        let wkSkills = wk.worker?.attributes?.routing?.skills || [];
        wkSkills.forEach((sk) => {
            if (!skillCounts[sk]) skillCounts[sk] = {};
            if (teams.includes(tm)) {
                let count = skillCounts[sk][tm] ? skillCounts[sk][tm] : 0;
                skillCounts[sk][tm] = count + 1;
            }
            let count = skillCounts[sk].All ? skillCounts[sk].All : 0;
            skillCounts[sk].All = count + 1;
        })
    });
    return skillCounts;
}
