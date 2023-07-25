export const mockWorkersData = [
  {
    "worker":
    {
      "friendly_name": "Agent10",
      "activityName": "Available",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["sales", "service", "fraud", "membership", "collections", "returns"]
        }

      }
    },
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "voice",
        "queue_name": "Sales",
        "attributes": {
          "direction": "inbound"
        }
      }
    ]

  },

  {
    "worker":
    {
      "friendly_name": "Agent10",
      "activityName": "Available",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["service", "collections", "returns"]
        }

      }
    },
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "voice",
        "queue_name": "Outbound Calls",
        "attributes": {
          "direction": "outbound"
        }
      }
    ]

  },
  {
    "worker":
    {
      "friendly_name": "Agent10",
      "activityName": "Available",
      "attributes": {
        "team_name": "ABC123",

        "routing": {
          "skills": ["collections", "returns"]
        }

      }
    },
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "sms",
      }
    ]

  },
  {
    "worker":
    {
      "friendly_name": "Agent11",
      "activityName": "Outbound",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["sales"]
        }

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent12",
      "activityName": "Unavailable",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["service", "fraud", "returns"]
        }

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent12",
      "activityName": "Unavailable",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["membership", "collections", "returns"]
        }

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent12",
      "activityName": "Available",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["sales", "service", "fraud"]
        }

      }
    },
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "sms",
      }
    ]

  },
  {
    "worker":
    {
      "friendly_name": "Agent12",
      "activityName": "Break",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["fraud", "membership", "collections", "returns"]
        }

      }
    }
  },


  {
    "worker":
    {
      "friendly_name": "Agent10",
      "activityName": "Available",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["fraud", "warranty"]
        }

      }
    },
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "sms",
      }
    ]

  },

  {
    "worker":
    {
      "friendly_name": "Agent10",
      "activityName": "Training",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["sales", "service", "fraud", "membership", "collections", "returns"]
        }

      }
    },
    "tasks": [

    ]

  },
  {
    "worker":
    {
      "friendly_name": "Agent10",
      "activityName": "Lunch",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["warranty", "membership", "collections", "returns"]
        }

      }
    },
    "tasks": [

    ]

  },
  {
    "worker":
    {
      "friendly_name": "Agent11",
      "activityName": "Available",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["sales", "service", "fraud", "warranty", "membership"]
        }

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent12",
      "activityName": "Unavailable",
      "attributes": {
        "team_name": "ABC123",

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent12",
      "activityName": "Unavailable",
      "attributes": {
        "team_name": "ABC123",
        "routing": {
          "skills": ["sales", "service", "fraud", "warranty", "membership", "collections", "returns"]
        }

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent12",
      "activityName": "Available",
      "attributes": {
        "team_name": "ABC123",

      }
    },
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "sms",
      }
    ]

  },
  {
    "worker":
    {
      "friendly_name": "Agent12",
      "activityName": "Break",
      "attributes": {
        "team_name": "ABC123",

      }
    }
  },



  {
    "worker":
    {
      "friendly_name": "Agent20",
      "activityName": "Offline",
      "attributes": {
        "team_name": "DEF456",
        "routing": {
          "skills": ["sales", "service", "fraud", "warranty", "collections", "returns"]
        }

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent21",
      "activityName": "Available",
      "attributes": {
        "team_name": "DEF456",
        "routing": {
          "skills": ["sales", "service", "fraud", "warranty", "membership"]
        }

      }
    },
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "sms",
      }
    ]

  },
  {
    "worker":
    {
      "friendly_name": "Agent21",
      "activityName": "Available",
      "attributes": {
        "team_name": "DEF456",
        "routing": {
          "skills": ["sales", "membership", "collections", "returns"]
        }

      }
    }
  }, {
    "worker":
    {
      "friendly_name": "Agent21",
      "activityName": "Available",
      "attributes": {
        "team_name": "DEF456",
        "routing": {
          "skills": ["warranty", "membership", "collections", "returns"]
        }

      }
    },
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "voice",
        "queue_name": "Sales",
        "attributes": {
          "direction": "outbound"
        }
      }
    ]
  }, {
    "worker":
    {
      "friendly_name": "Agent21",
      "activityName": "Break",
      "attributes": {
        "team_name": "DEF456",
        "routing": {
          "skills": ["sales", "warranty", "membership", "collections"]
        }

      }
    },
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "voice",
        "queue_name": "Sales",
        "attributes": {
          "direction": "outbound"
        }
      }
    ]
  }, {
    "worker":
    {
      "friendly_name": "Agent21",
      "activityName": "Break",
      "attributes": {
        "team_name": "DEF456",
        "routing": {
          "skills": ["sales", "service", "collections", "returns"]
        }

      }
    }, 
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "voice",
        "queue_name": "Sales",
        "attributes": {
          "direction": "outbound"
        }
      }
    ]
  },
  {
    "worker":
    {
      "friendly_name": "Agent30",
      "activityName": "Offline",
      "attributes": {
        "team_name": "XYZ789",
        "routing": {
          "skills": ["sales", "fraud", "warranty", "membership", "collections", "returns"]
        }

      }
    },
     "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "chat",
        "queue_name": "Sales",
        "attributes": {
          "direction": "inbound"
        }
      },
      {
        "status": "accepted",
        "task_channel_unique_name": "chat",
        "queue_name": "Service",
        "attributes": {
          "direction": "inbound"
        }
      },
      {
        "status": "accepted",
        "task_channel_unique_name": "voice",
        "queue_name": "Sales",
        "attributes": {
          "direction": "outbound"
        }
      }
    ]
  },
  {
    "worker":
    {
      "friendly_name": "Agent31",
      "activityName": "Available",
      "attributes": {
        "team_name": "XYZ789",

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent31",
      "activityName": "Available",
      "attributes": {
        "team_name": "XYZ789",

      }
    }
  }, {
    "worker":
    {
      "friendly_name": "Agent31",
      "activityName": "Available",
      "attributes": {
        "team_name": "XYZ789",

      }
    }
  }, {
    "worker":
    {
      "friendly_name": "Agent31",
      "activityName": "Outbound",
      "attributes": {
        "team_name": "XYZ789",
        "routing": {
          "skills": ["membership", "collections"]
        }

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent31",
      "activityName": "Training",
      "attributes": {
        "team_name": "XYZ789",

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent31",
      "activityName": "Lunch",
      "attributes": {
        "team_name": "XYZ789",

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent31",
      "activityName": "Training",
      "attributes": {
        "team_name": "XYZ789",

      }
    }
  },
  {
    "worker":
    {
      "friendly_name": "Agent31",
      "activityName": "Lunch",
      "attributes": {
        "team_name": "XYZ789",

      }
    },
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "chat",
        "queue_name": "Sales",
        "attributes": {
          "direction": "inbound"
        }
      },
      {
        "status": "accepted",
        "task_channel_unique_name": "chat",
        "queue_name": "Service",
        "attributes": {
          "direction": "inbound"
        }
      },
      {
        "status": "accepted",
        "task_channel_unique_name": "voice",
        "queue_name": "Sales",
        "attributes": {
          "direction": "outbound"
        }
      }
    ]
  },
  {
    "worker":
    {
      "friendly_name": "Agent33",
      "activityName": "Break",
      "attributes": {
        "team_name": "XYZ789",
        "routing": {
          "skills": ["sales", "fraud", "collections"]
        }

      }
    },
    "tasks": [
      {
        "status": "accepted",
        "task_channel_unique_name": "voice",
        "queue_name": "Sales",
        "attributes": {
          "direction": "inbound"
        }
      },
      {
        "status": "accepted",
        "task_channel_unique_name": "voice",
        "queue_name": "Sales",
        "attributes": {
          "direction": "inbound"
        }
      }
    ]

  }

]


