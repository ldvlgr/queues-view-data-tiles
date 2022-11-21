const channelList = ["chat", "sms", "voice"];

class QueueDataUtil {
  getTasksByGroup = (queues, group) => {
    let activeTasks = 0;
    let waitingTasks = 0;
    if (queues && queues.length > 0) {
      queues.forEach(q => {
        if (q.friendly_name.toLowerCase().includes(group)) {
          if (q.tasks_by_status) {
            activeTasks += q.tasks_by_status.assigned + q.tasks_by_status.wrapping;
            waitingTasks += q.tasks_by_status.pending + q.tasks_by_status.reserved;
          }
        }
      })
    }
    return { activeTasks, waitingTasks }
  }

  //New function to calc task counts by group
  getTasksByQueueGroups = (queues, queueGroups) => {
    //For example, queueGroups =["sales", "service"]
    let taskCounts = {};
    //Initialize return object
    queueGroups.forEach(group => {
      taskCounts[group] = {};
    });
    if (queues && queues.length > 0) {
      queues.forEach(q => {
        queueGroups.forEach(group => {
          //Assumption is that group identifiers are distinct (should only match 1 queue once)
          if (q.friendly_name.toLowerCase().includes(group)) {
            //or use substring if you only want to compare first part of queue name
            if (q.tasks_by_status) {
              taskCounts[group].activeTasks += q.tasks_by_status.assigned + q.tasks_by_status.wrapping;
              taskCounts[group].waitingTasks += q.tasks_by_status.pending + q.tasks_by_status.reserved;
            }
          }
        })
      });
    }
    return taskCounts;
  }


  getTaskCountsByChannel = (queues) => {
    let taskCounts = {
      chat: { activeTasks: 0, waitingTasks: 0 },
      sms: { activeTasks: 0, waitingTasks: 0 },
      voice: { activeTasks: 0, waitingTasks: 0 }
    };
    if (queues && queues.length > 0) {
      queues.forEach(q => {
        if (q.channels) {
          q.channels.forEach(ch => {
            //Only aggregate counts for configured channels
            if (channelList.includes(ch.unique_name)) {
              if (ch.tasks_now) {
                taskCounts[ch.unique_name].activeTasks += ch?.tasks_now?.active_tasks;
                taskCounts[ch.unique_name].waitingTasks += ch?.tasks_now?.waiting_tasks;
              }
            }
          })
        }
      })
    }
    return taskCounts;
  }


  getSLTodayByChannel = (queues) => {
    let slMetrics = {
      chat: { handledTasks: 0, handledTasksWithinSL: 0, serviceLevelPct: 0 },
      sms: { handledTasks: 0, handledTasksWithinSL: 0, serviceLevelPct: 0 },
      voice: { handledTasks: 0, handledTasksWithinSL: 0, serviceLevelPct: 0 }
    };
    if (queues && queues.length > 0) {
      queues.forEach(q => {
        if (q.channels) {
          q.channels.forEach(ch => {
            if (channelList.includes(ch.unique_name)) {
              //Not all queues/channels have SLA
              if (ch.sla_today) {
                slMetrics[ch.unique_name].handledTasks += ch?.sla_today?.handled_tasks_count;
                slMetrics[ch.unique_name].handledTasksWithinSL += ch?.sla_today?.handled_tasks_within_sl_threshold_count;
              }
            }
          })
        }
      })
    }
    channelList.forEach(ch => {
      if (slMetrics[ch].handledTasks > 0)
        slMetrics[ch].serviceLevelPct = Math.floor((slMetrics[ch].handledTasksWithinSL / slMetrics[ch].handledTasks) * 100);
    })
    return slMetrics;
  }

}

const queueDataUtil = new QueueDataUtil;

export default queueDataUtil;