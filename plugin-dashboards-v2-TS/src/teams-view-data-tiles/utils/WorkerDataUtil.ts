import { Manager } from '@twilio/flex-ui';
import { ActivityCounts, TaskCounts, SkillCounts, TasksAndCapacity, TeamTasksAndCapacity } from '../types';
import { SupervisorWorkerState } from '@twilio/flex-ui/src/state/State.definition';
const _manager = Manager.getInstance();
const workerActivities = _manager.store.getState().flex?.worker?.activities || new Map();

const STATUS_AVAILABLE = 'Available';
const STATUS_BUSY = 'Busy';
const STATUS_IDLE = 'Idle';
const TASK_CHANNEL_VOICE = 'voice';

export function getAgentStatusCounts(workers: SupervisorWorkerState[] = [], teams: string[] = []) {
    //If task count == 0, Status = 'Idle'
    //If task count > 0, Status = 'Busy' 
    let activityCounts: ActivityCounts = {};
    activityCounts['All'] = { teamName: 'All', totalAgentCount: 0, activities: {} };
    //Init activity counts
    teams.forEach((team) => {
        activityCounts[team] = { teamName: team, totalAgentCount: 0, activities: {} };
        workerActivities.forEach((value, key) => {
            activityCounts[team].activities[value.name] = 0;
            activityCounts['All'].activities[value.name] = 0;
        });
    });

    //Aggregate Activity/Status by Team
    workers.forEach((wk) => {
        let workerStatus = wk.worker.activityName;
        let tm: string = wk.worker?.attributes?.team_name || 'Other';
        if (workerStatus === STATUS_AVAILABLE) {
            // Determine Busy status (1+ tasks) vs. Idle (0 tasks)
            const tasks = wk?.tasks || [];
            workerStatus = STATUS_IDLE;
            if (tasks.length > 0) workerStatus = STATUS_BUSY
        }
        if (teams.includes(tm)) {
            let count = activityCounts[tm].activities[workerStatus] ? activityCounts[tm].activities[workerStatus] : 0;
            activityCounts[tm].activities[workerStatus] = count + 1;
            activityCounts[tm].totalAgentCount += 1;
        }
        // Total Count for All Workers/Teams
        let count = activityCounts.All.activities[workerStatus] ? activityCounts.All.activities[workerStatus] : 0;
        activityCounts.All.activities[workerStatus] = count + 1;
        activityCounts.All.totalAgentCount += 1;
    });

    return activityCounts;
}


export function getSkillsCounts(workers: SupervisorWorkerState[] = [], teams: string[] = []) {
    let skillCounts: SkillCounts = {};
    skillCounts['All'] = {};
    teams.forEach((team) => {
        skillCounts[team] = {};
    });
    //Aggregate Skills
    workers.forEach((wk) => {
        let tm: string = wk.worker?.attributes?.team_name || 'Other';
        let wkSkills = wk.worker?.attributes?.routing?.skills || [];
        wkSkills.forEach((sk) => {
            if (teams.includes(tm)) {
                let count = skillCounts[tm][sk] ? skillCounts[tm][sk] : 0;
                skillCounts[tm][sk] = count + 1;
            }
            let count = skillCounts.All[sk] ? skillCounts.All[sk] : 0;
            skillCounts.All[sk] = count + 1;
        })
    });
    return skillCounts;
}

export function getSkillsByTeamCounts(workers: SupervisorWorkerState[] = [], teams: string[] = []) {
    let skillCounts: SkillCounts = {};
    //Aggregate Skills
    workers.forEach((wk) => {
        let tm = wk.worker?.attributes?.team_name || 'Other';
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

export function getTasksByTeamCounts(workers: SupervisorWorkerState[] = [], teams: string[] = []) {
    let taskCounts: TaskCounts = {};
    taskCounts['All'] = { teamName: 'All', tasks: { voice_inbound: 0, voice_outbound: 0, sms: 0, chat: 0 } };
    //Init task counts
    teams.forEach((team) => {
        taskCounts[team] = { teamName: team, tasks: { voice_inbound: 0, voice_outbound: 0, sms: 0, chat: 0 } };
    });
    workers.forEach((wk) => {
        let tm: string = wk.worker?.attributes?.team_name ? wk.worker.attributes.team_name : 'Other';
        let channel = '';
        const tasks = wk?.tasks || [];
        tasks.forEach((task) => {
            if (task.taskChannelUniqueName == TASK_CHANNEL_VOICE) {
                channel = 'voice_' + (task.attributes?.direction || 'inbound');
            } else {
                channel = task.taskChannelUniqueName;
            }
            if (teams.includes(tm)) {
                let count = taskCounts[tm].tasks[channel] ? taskCounts[tm].tasks[channel] : 0;
                taskCounts[tm].tasks[channel] = count + 1;
            }
            let count = taskCounts.All.tasks[channel] ? taskCounts.All.tasks[channel] : 0;
            taskCounts.All.tasks[channel] = count + 1;
        });
    });
    return taskCounts;
}


export function getTasksAndCapacity(workers: SupervisorWorkerState[] = []) {
    const initTasks = { voice_inbound: 0, voice_outbound: 0, sms: 0, chat: 0 };
    const initCapacity = { voice: 0, sms: 0, chat: 0 };

    let tasksAndCapacity: TasksAndCapacity = {
        tasks: { ...initTasks },
        capacity: { ...initCapacity }
    };
    workers.forEach((wk) => {
        let channel = '';
        const tasks = wk?.tasks || [];
        tasks.forEach((task) => {
            console.log('Task:', task);
            if (task.taskChannelUniqueName == TASK_CHANNEL_VOICE) {
                channel = 'voice_' + (task.attributes?.direction || 'inbound');
            } else {
                channel = task.taskChannelUniqueName;
            }
            let count = tasksAndCapacity?.tasks[channel] ? tasksAndCapacity.tasks[channel] : 0;
            tasksAndCapacity.tasks[channel] = count + 1;
        });
        let wkCh = wk.worker?.attributes?.channels;
        let wkMaxSms = (wkCh?.sms?.available && wkCh?.sms?.capacity) ? wkCh?.sms?.capacity : 0;
        let wkMaxChat = (wkCh?.chat?.available && wkCh?.chat?.capacity) ? wkCh?.chat?.capacity : 0;

        let capacity = tasksAndCapacity?.capacity?.sms ? tasksAndCapacity?.capacity?.sms : 0;
        tasksAndCapacity.capacity.sms = capacity + wkMaxSms;
        capacity = tasksAndCapacity?.capacity?.chat ? tasksAndCapacity?.capacity.chat : 0;
        tasksAndCapacity.capacity.chat = capacity + wkMaxChat;
    });
    return tasksAndCapacity;
}


export function getTasksAndCapacityByTeam(workers: SupervisorWorkerState[] = [], teams: string[] = []) {
    const initTasks = { voice_inbound: 0, voice_outbound: 0, sms: 0, chat: 0 };
    const initCapacity = { voice: 0, sms: 0, chat: 0 };

    let tasksAndCapacity: TeamTasksAndCapacity = {};
    tasksAndCapacity['All'] = {
        teamName: 'All',
        tasks: { ...initTasks },
        capacity: { ...initCapacity }
    };
    //Init task counts
    teams.forEach((team) => {
        tasksAndCapacity[team] = {
            teamName: team,
            tasks: { ...initTasks },
            capacity: { ...initCapacity }
        };
    });
    workers.forEach((wk) => {
        let tm: string = wk.worker?.attributes?.team_name || 'Other';
        let channel = '';
        const tasks = wk?.tasks || [];
        tasks.forEach((task) => {
            console.log('Task:', task);
            if (task.taskChannelUniqueName == TASK_CHANNEL_VOICE) {
                channel = 'voice_' + (task.attributes?.direction || 'inbound');
            } else {
                channel = task.taskChannelUniqueName;
            }
            if (teams.includes(tm)) {
                let taskCount = tasksAndCapacity[tm]?.tasks[channel] ? tasksAndCapacity[tm]?.tasks[channel] : 0;
                tasksAndCapacity[tm].tasks[channel] = taskCount + 1;
            }
            let count = tasksAndCapacity.All?.tasks[channel] ? tasksAndCapacity.All.tasks[channel] : 0;
            tasksAndCapacity.All.tasks[channel] = count + 1;
        });
        let wkCh = wk.worker?.attributes?.channels;
        let wkMaxSms = (wkCh?.sms?.available && wkCh?.sms?.capacity) ? wkCh?.sms?.capacity : 0;
        let wkMaxChat = (wkCh?.chat?.available && wkCh?.chat?.capacity) ? wkCh?.chat?.capacity : 0;

        if (teams.includes(tm)) {
            let capacity = tasksAndCapacity[tm]?.capacity?.sms ? tasksAndCapacity[tm].capacity.sms : 0;
            tasksAndCapacity[tm].capacity.sms = capacity + wkMaxSms
            capacity = tasksAndCapacity[tm]?.capacity?.chat ? tasksAndCapacity[tm].capacity.chat : 0;
            tasksAndCapacity[tm].capacity.chat = capacity + wkMaxChat;
        }
        let capacity = tasksAndCapacity.All?.capacity?.sms ? tasksAndCapacity.All?.capacity?.sms : 0;
        tasksAndCapacity.All.capacity.sms = capacity + wkMaxSms;
        capacity = tasksAndCapacity.All?.capacity?.chat ? tasksAndCapacity.All?.capacity.chat : 0;
        tasksAndCapacity.All.capacity.chat = capacity + wkMaxChat;
    });
    return tasksAndCapacity;
}

