export const getChannelIcon = (channelName: string) => {
  const channelIcons: { [key: string]: string } = {
      voice: "Call",
      chat: "Message",
      sms: "Sms",
      video: "Video"
  };
  return channelIcons[channelName];
}
