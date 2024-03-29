export interface ChannelTaskCounts {
  activeTasks: number;
  waitingTasks: number;
  assignedTasks: number;
  wrappingTasks: number;
}

export interface TaskCounts {
  [channel: string]: ChannelTaskCounts;
}

export interface ChannelSLMetrics {
  handledTasks: number;
  handledTasksWithinSL: number;
  serviceLevelPct: number;
}

export interface SLMetrics {
  [channel: string]: ChannelSLMetrics;
}

export interface QueueGroupMetrics {
  [group: string]: {
    queues: string[];
    tasksNow: {
      activeTasks: number;
      waitingTasks: number;
      assignedTasks: number;
      wrappingTasks: number;
    }
    slaToday: {
      handledTasks: number;
      handledTasksWithinSL: number;
      serviceLevelPct: number;
    }
  }
}

