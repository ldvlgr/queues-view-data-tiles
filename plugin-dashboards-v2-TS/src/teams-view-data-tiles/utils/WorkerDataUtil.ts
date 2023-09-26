import { Manager } from '@twilio/flex-ui';
import { ActivityCounts, TaskCounts, SkillCounts, TasksAndCapacity, TeamTasksAndCapacity } from '../types';
import { SupervisorWorkerState } from '@twilio/flex-ui/src/state/State.definition';
const _manager = Manager.getInstance();
const workerActivities = _manager.store.getState().flex?.worker?.activities || new Map();

const STATUS_AVAILABLE = 'Available';
const TASK_CHANNEL_VOICE = 'voice';

export function getAgentStatusCounts(workers: SupervisorWorkerState[] = [], teams: string[] = []) {
    const ac: ActivityCounts = {};
    ac.All = { teamName: 'All', totalAgentCount: 0, activities: { Idle: 0, Busy: 0 } };
    // Init activity counts
    teams.forEach((team) => {
      ac[team] = { teamName: team, totalAgentCount: 0, activities: { Idle: 0, Busy: 0 } };
      workerActivities.forEach((value) => {
        ac[team].activities[value.name] = 0;
        ac.All.activities[value.name] = 0;
      });
    });
  
    // Aggregate Activity/Status by Team
    workers.forEach((wk) => {
      const workerStatus = wk.worker.activityName;
      const tasks = wk?.tasks || [];
      const tm: string = wk.worker?.attributes?.team_name || 'Other';
      if (teams.includes(tm)) {
        const count = ac[tm].activities[workerStatus] ? ac[tm].activities[workerStatus] : 0;
        ac[tm].activities[workerStatus] = count + 1;
        ac[tm].totalAgentCount += 1;
        if (workerStatus === STATUS_AVAILABLE) {
          if (tasks.length > 0) {
            const count = ac[tm].activities.Busy ? ac[tm].activities.Busy : 0;
            ac[tm].activities.Busy = count + 1;
          } else {
            const count = ac[tm].activities.Idle ? ac[tm].activities.Idle : 0;
            ac[tm].activities.Idle = count + 1;
          }
        }
      }
      // Total Count for All Workers/Teams
      const count = ac.All.activities[workerStatus] ? ac.All.activities[workerStatus] : 0;
      ac.All.activities[workerStatus] = count + 1;
      if (workerStatus === STATUS_AVAILABLE) {
        if (tasks.length > 0) {
          const count = ac.All.activities.Busy ? ac.All.activities.Busy : 0;
          ac.All.activities.Busy = count + 1;
        } else {
          const count = ac.All.activities.Idle ? ac.All.activities.Idle : 0;
          ac.All.activities.Idle = count + 1;
        }
      }
      ac.All.totalAgentCount += 1;
    });
  
    return ac;
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

