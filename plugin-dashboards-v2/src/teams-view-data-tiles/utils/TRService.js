import { Manager } from '@twilio/flex-ui';
const manager = Manager.getInstance();
const PLUGIN_NAME = 'QueuesViewDataTiles';

export const updateWorkerWithCapacity = async (workerSid) => {
  console.debug(PLUGIN_NAME, 'Update Worker with Channels Capacity');
  const fetchUrl = `${process.env.FLEX_APP_FUNCTIONS_BASE}/updateWorkerWithCapacity`;
  const fetchBody = {
    Token: manager.store.getState().flex.session.ssoTokenPayload.token,
    workerSid
  };
  const fetchOptions = {
    method: 'POST',
    body: new URLSearchParams(fetchBody),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };

  let workerAttributes;
  try {
    const response = await fetch(fetchUrl, fetchOptions);
    workerAttributes = await response.json();
    console.debug(PLUGIN_NAME, 'Updated Worker:', workerAttributes);
  } catch (error) {
    console.error(PLUGIN_NAME, 'Failed to update Worker');
  }
  return workerAttributes;
}