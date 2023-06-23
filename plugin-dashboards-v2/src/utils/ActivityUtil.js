import { Manager } from '@twilio/flex-ui';

const _manager = Manager.getInstance();
const workerActivities = _manager.store.getState().flex?.worker?.activities || new Map();

export function getAgentActivityCounts(workers = [], teams = []) {
    let activityCounts = {};
    //All Teams, init activity counts
    activityCounts["Other"] = { teamName: "Other" };
    workerActivities.forEach((value, key) => {
        activityCounts["Other"][value.name] = 0;
    });
    teams.forEach((team) => {
        activityCounts[team] = { teamName: team };
        workerActivities.forEach((value, key) => {
            activityCounts[team][value.name] = 0;
        });
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
        //console.log('ACTIVITY COUNTS:', activityCounts);
    });
    return activityCounts;
}

const STATUS_AVAILABLE = "Available";
const STATUS_BUSY = "Busy";
const STATUS_IDLE = "Idle";

export function getAgentStatusCounts(workers = [], teams = []) {
    //Version 2: Also consider if worker has tasks
    //If task count == 0, Status = "Idle"
    //If task count > 0, Status = "Busy" 
    let activityCounts = {};
    //All Teams, init activity counts
    activityCounts["Other"] = { teamName: "Other" };
    workerActivities.forEach((value, key) => {
        activityCounts["Other"][value.name] = 0;
    });
    teams.forEach((team) => {
        activityCounts[team] = { teamName: team };
        workerActivities.forEach((value, key) => {
            activityCounts[team][value.name] = 0;
        });
        //Aggregate Activity/Status by Team
        workers.forEach((wk) => {
            let workerStatus = wk.worker.activityName;
            let tm = wk.worker?.attributes?.team_name || "Other";
            if (team == tm) {
                if (workerStatus === STATUS_AVAILABLE) {
                    // Break out Busy (1+ tasks) vs.  Idle (0 tasks)
                    const tasks = wk?.tasks || [];
                    workerStatus = STATUS_IDLE;
                    if (tasks.length > 0) workerStatus = STATUS_BUSY
                }
                let count = activityCounts[tm][workerStatus] ? activityCounts[tm][workerStatus] : 0;
                activityCounts[tm][workerStatus] = count + 1;

            } else {
                let count = activityCounts.Other[workerStatus] ? activityCounts.Other[workerStatus] : 0;
                activityCounts.Other[workerStatus] = count + 1;
            }
        });

    });
    //Aggregate Activity/Status for all workers
    activityCounts["All"] = { teamName: "All" };
    workerActivities.forEach((value, key) => {
        activityCounts["All"][value.name] = 0;
    });

    workers.forEach((wk) => {
        let workerStatus = wk.worker.activityName;
        if (workerStatus === STATUS_AVAILABLE) {
            // Break out Busy (1+ tasks) vs.  Idle (0 tasks)
            const tasks = wk?.tasks || [];
            workerStatus = STATUS_IDLE;
            if (tasks.length > 0) workerStatus = STATUS_BUSY
        }
        let count = activityCounts.All[workerStatus] ? activityCounts.All[workerStatus] : 0;
        activityCounts.All[workerStatus] = count + 1;
    });
    //console.log('ACTIVITY COUNTS:', activityCounts);


    return activityCounts;
}


