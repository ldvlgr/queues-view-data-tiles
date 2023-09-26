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
      console.log(wc);
      if (wc.taskChannelUniqueName == "chat") {
        channels.chat.available = wc.available;
        channels.chat.capacity = wc.configuredCapacity;
      } else if (wc.taskChannelUniqueName == "sms") {
        channels.sms.available = wc.available;
        channels.sms.capacity = wc.configuredCapacity;
      }
    })
    console.log('Channels: ', channels);

    //Update capacity in Worker attributes
    const worker = await client.taskrouter.v1
      .workspaces(context.TWILIO_WORKSPACE_SID)
      .workers(workerSid)
      .fetch();

    console.log('Worker:', worker);
    // Worker Attributes are encoded as Json string
    let workersAttributes = JSON.parse(worker.attributes);

    workersAttributes = {
      ...workersAttributes, channels};

    const updateWorker = await client.taskrouter.v1
      .workspaces(context.TWILIO_WORKSPACE_SID)
      .workers(workerSid)
      .update({ attributes: JSON.stringify(workersAttributes) });

    console.log('Updated', workerSid, 'attributes with', workersAttributes);

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
