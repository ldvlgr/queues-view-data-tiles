export const getChannelIcon = (channelName) => {
  const channelIcons = {
    voice: 'Call',
    chat: 'Message',
    sms: 'Sms',
    video: 'Video',
    default: 'GenericTask',
  };
  return channelIcons[channelName];
};
