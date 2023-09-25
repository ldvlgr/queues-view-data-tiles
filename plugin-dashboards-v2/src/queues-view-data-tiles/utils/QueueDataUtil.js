const channelList = ['chat', 'sms', 'voice'];

class QueueDataUtil {
  getTasksByGroup = (queues = [], group = '') => {
    let activeTasks = 0;
    let waitingTasks = 0;
    if (queues && queues.length > 0) {
      queues.forEach(q => {
        let qParts = q.friendly_name.toLowerCase().split('.');
        if (group == qParts[0]) {
          //        if (q.friendly_name.toLowerCase().includes(group)) {
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
  getTasksByQueueGroups = (queues = [], queueGroups = []) => {
    //For example, queueGroups =['sales', 'service']
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


  getTaskCountsByChannel = (queues = []) => {
    const initCounts = { activeTasks: 0, assignedTasks: 0, wrappingTasks: 0, waitingTasks: 0 };
    let taskCounts = {
      chat: { ...initCounts },
      sms: { ...initCounts },
      voice: { ...initCounts }
    };
    if (queues.length === 0) return taskCounts;
    queues.forEach(q => {
      if (q.channels) {
        q.channels.forEach(ch => {
          //Only aggregate counts for configured channels
          const wqChannelName = ch.unique_name ? ch.unique_name : "unknown";
          if (channelList.includes(wqChannelName) && (ch.tasks_now)) {
            const assignedTasks = ch?.tasks_now?.assigned_tasks;
            const wrappingTasks = ch?.tasks_now?.wrapping_tasks;
            taskCounts[wqChannelName].assignedTasks += assignedTasks;
            taskCounts[wqChannelName].wrappingTasks += wrappingTasks;
            taskCounts[wqChannelName].activeTasks += ch?.tasks_now?.active_tasks;
            taskCounts[wqChannelName].waitingTasks += ch?.tasks_now?.waiting_tasks;
          }
        })
      }
    })
    return taskCounts;
  }


  getSLTodayByChannel = (queues = []) => {
    const initSLMetrics = { handledTasks: 0, handledTasksWithinSL: 0, serviceLevelPct: 0 }
    let slMetrics = {
      chat: { ...initSLMetrics },
      sms: { ...initSLMetrics },
      voice: { ...initSLMetrics }
    };
    if (queues.length === 0) return slMetrics;
    queues.forEach(q => {
      if (q.channels) {
        q.channels.forEach(ch => {
          if (channelList.includes(ch.unique_name) && (ch.sla_today)) {
            slMetrics[ch.unique_name].handledTasks += ch?.sla_today?.handled_tasks_count;
            slMetrics[ch.unique_name].handledTasksWithinSL += ch?.sla_today?.handled_tasks_within_sl_threshold_count;
          }
        })
      }
    })
    channelList.forEach(ch => {
      if (slMetrics[ch].handledTasks > 0)
        slMetrics[ch].serviceLevelPct = Math.floor((slMetrics[ch].handledTasksWithinSL / slMetrics[ch].handledTasks) * 100);
    })
    return slMetrics;
  }

  getSLTodayByGroup = (queues = [], group = '') => {
    let handledTasks = 0;
    let handledTasksWithinSL = 0;
    let serviceLevelPct = 0;
    if (queues && queues.length > 0) {
      queues.forEach(q => {
        // Match queue on 'group'. Use includes(), substring() or match on part of queue name
        // if queues have syntax like support.abc.xyz use this:
        // let qParts = q.friendly_name.toLowerCase().split('.');
        // if (group == qParts[0]) {
        if (q.friendly_name.toLowerCase().includes(group)) {
          //Aggregate SL stats
          if (q.sla_today) {
            handledTasks += q?.sla_today?.handled_tasks_count;
            handledTasksWithinSL += q?.sla_today?.handled_tasks_within_sl_threshold_count;
          }
        }
      })
    }
    if (handledTasks > 0) {
      serviceLevelPct = Math.floor((handledTasksWithinSL / handledTasks) * 100);
    }
    return { handledTasks, handledTasksWithinSL, serviceLevelPct };;
  }

  //Aggregate SL stats for all queue groups to display in a bar chart tile
  getSLTodayByQueueGroups = (queues = [], queueGroups = []) => {
    let slMetrics = {};
    //Initialize return object
    queueGroups.forEach(group => {
      slMetrics[group] = { handledTasks: 0, handledTasksWithinSL: 0, serviceLevelPct: 0 };
    });
    if (queues.length === 0) return slMetrics;
    queues.forEach(q => {
      queueGroups.forEach(group => {
        // Match queue on 'group'. Use includes(), substring() or match on part of queue name
        // if queues have syntax like support.abc.xyz use this:
        // let qParts = q.friendly_name.toLowerCase().split('.');
        // if (group == qParts[0]) {
        if (q.friendly_name.toLowerCase().includes(group)) {
          //Aggregate SL stats by queue grouping
          if (q.sla_today) {
            slMetrics[group].handledTasks += q?.sla_today?.handled_tasks_count;
            slMetrics[group].handledTasksWithinSL += q?.sla_today?.handled_tasks_within_sl_threshold_count;
          }
        }
      });
    })
    //Mock data
    slMetrics.sales = { handledTasks: 98, handledTasksWithinSL: 95, serviceLevelPct: 0 };
    slMetrics.service = { handledTasks: 25, handledTasksWithinSL: 12, serviceLevelPct: 0 };
    slMetrics.care = { handledTasks: 60, handledTasksWithinSL: 50, serviceLevelPct: 0 };
    slMetrics.fraud = { handledTasks: 40, handledTasksWithinSL: 38, serviceLevelPct: 0 };
    //Calc SL % per group
    queueGroups.forEach(group => {
      if (slMetrics[group].handledTasks > 0)
        slMetrics[group].serviceLevelPct = Math.floor((slMetrics[group].handledTasksWithinSL / slMetrics[group].handledTasks) * 100);
    })
    return slMetrics;
  }

  getQueueGroupMetrics = (queues = [], queueGroups = [], filter = "") => {
    const metrics = { };
    const initTasksNow = { activeTasks: 0, assignedTasks: 0, wrappingTasks: 0, waitingTasks: 0 };
    const initSlaToday = { handledTasks: 0, handledTasksWithinSL: 0, serviceLevelPct: 0 };
    queueGroups.forEach((group) => {
      metrics[group] = { 
        tasksNow: { ...initTasksNow }, 
        slaToday: { ...initSlaToday },
        queues: [] 
      };
    });
    if (queues.length === 0) return metrics;
    queues.forEach((q) => {
      const qName = q.friendly_name.toLowerCase();
      queueGroups.forEach((group) => {
        if (qName.includes(group.toLowerCase()) && qName.includes(filter)) {
          const queues =  metrics[group].queues;
          metrics[group].queues = queues.concat([qName]);
          if (q.sla_today) {
            metrics[group].slaToday.handledTasks += q?.sla_today?.handled_tasks_count;
            metrics[group].slaToday.handledTasksWithinSL += q?.sla_today?.handled_tasks_within_sl_threshold_count;
          }
          if (q.tasks_by_status) {
            const assignedTasks = q.tasks_by_status.assigned;
            const wrappingTasks = q.tasks_by_status.wrapping;
            metrics[group].tasksNow.assignedTasks += assignedTasks;
            metrics[group].tasksNow.wrappingTasks += wrappingTasks;
            metrics[group].tasksNow.activeTasks += assignedTasks + wrappingTasks;
            metrics[group].tasksNow.waitingTasks += q.tasks_by_status.pending + q.tasks_by_status.reserved;
          }
        }
      });
    });
    queueGroups.forEach((group) => {
      if (metrics[group].slaToday.handledTasks > 0)
        metrics[group].slaToday.serviceLevelPct = Math.floor(
          (metrics[group].slaToday.handledTasksWithinSL / metrics[group].slaToday.handledTasks) * 100,
        );
    });
    return metrics;
  };
}

const queueDataUtil = new QueueDataUtil;

export default queueDataUtil;