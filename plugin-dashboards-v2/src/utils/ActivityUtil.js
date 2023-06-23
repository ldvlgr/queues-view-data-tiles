import { Manager } from '@twilio/flex-ui';

const _manager = Manager.getInstance();
const workerActivities = _manager.store.getState().flex?.worker?.activities || new Map();

// export function getAgentActivityCounts(workers = [], teams = []) {
//     let activityCounts = {};
//     //All Teams, init activity counts
//     activityCounts["Other"] = { teamName: "Other" };
//     workerActivities.forEach((value, key) => {
//         activityCounts["Other"][value.name] = 0;
//     });
//     teams.forEach((team) => {
//         activityCounts[team] = { teamName: team };
//         workerActivities.forEach((value, key) => {
//             activityCounts[team][value.name] = 0;
//         });
//         workers.forEach((wk) => {
//             let activity = wk.worker.activityName;
//             let tm = wk.worker?.attributes?.team_name || "Other";
//             if (team == tm) {
//                 let count = activityCounts[tm][activity] ? activityCounts[tm][activity] : 0;
//                 activityCounts[tm][activity] = count + 1;
//             } else {
//                 let count = activityCounts.Other[activity] ? activityCounts.Other[activity] : 0;
//                 activityCounts.Other[activity] = count + 1;
//             }
//         });
//         //console.log('ACTIVITY COUNTS:', activityCounts);
//     });
//     return activityCounts;
// }

const STATUS_AVAILABLE = "Available";
const STATUS_BUSY = "Busy";
const STATUS_IDLE = "Idle";

export function getAgentStatusCounts(workers = [], teams = []) {
    //Version 2: Also consider if worker has tasks
    //If task count == 0, Status = "Idle"
    //If task count > 0, Status = "Busy" 
    let activityCounts = {};
    activityCounts["All"] = { teamName: "All" };
    //Init activity counts
    teams.forEach((team) => {
        activityCounts[team] = { teamName: team };
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
        }
        // Total Count for All Workers/Teams
        let count = activityCounts.All[workerStatus] ? activityCounts.All[workerStatus] : 0;
        activityCounts.All[workerStatus] = count + 1;
    });

    return activityCounts;
}


