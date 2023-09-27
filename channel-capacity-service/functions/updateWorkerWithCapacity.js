const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(async function (context, event, callback) {
  const client = context.getTwilioClient();
  const response = new Twilio.Response();

  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  let channels = {
    chat: {
      available: false,
      capacity: 1
    },
    sms: {
      available: false,
      capacity: 1
    }
  }
  try {
    const { workerSid } = event;
    //Get Worker Channels
    const workerChannels = await client.taskrouter.v1
      .workspaces(context.TWILIO_WORKSPACE_SID)
      .workers(workerSid)
      .workerChannels
      .list({ limit: 20 });

    workerChannels.forEach(wc => {
      // console.log(wc);
      if (wc.taskChannelUniqueName == "chat") {
        channels.chat.available = wc.available;
        channels.chat.capacity = wc.configuredCapacity;
      } else if (wc.taskChannelUniqueName == "sms") {
        channels.sms.available = wc.available;
        channels.sms.capacity = wc.configuredCapacity;
      }
    })
    console.log('WorkerChannels: ', channels);

    const worker = await client.taskrouter.v1
      .workspaces(context.TWILIO_WORKSPACE_SID)
      .workers(workerSid)
      .fetch();

    // Worker Attributes are encoded as Json string
    let wkAttr = JSON.parse(worker.attributes);
    console.log('Channels in Attributes:', wkAttr.channels);

    if (wkAttr.channels && wkAttr.channels.chat.available == channels.chat.available
      && wkAttr.channels.chat.capacity == channels.chat.capacity
      && wkAttr.channels.sms.available == channels.sms.available
      && wkAttr.channels.sms.capacity == channels.sms.capacity) {
      console.log('No change in Channels');
      response.appendHeader("Content-Type", "application/json");
      response.setBody(wkAttr);
      return callback(null, response);
    }

    console.log('Channel Capacity Changed - Update Worker Attributes');
    wkAttr = {
      ...wkAttr, channels
    };

    const updateWorker = await client.taskrouter.v1
      .workspaces(context.TWILIO_WORKSPACE_SID)
      .workers(workerSid)
      .update({ attributes: JSON.stringify(wkAttr) });

    console.log('Updated', workerSid, 'attributes with channels: ', channels);

    response.appendHeader("Content-Type", "application/json");
    response.setBody(JSON.parse(updateWorker.attributes));
    return callback(null, response);
  } catch (err) {
    returnError(callback, response, err.message);
  }
});

const returnError = (callback, response, errorString) => {
  console.error(errorString);
  response.appendHeader("Content-Type", "plain/text");
  response.setBody(errorString);
  response.setStatusCode(500);
  return callback(null, response);
};
