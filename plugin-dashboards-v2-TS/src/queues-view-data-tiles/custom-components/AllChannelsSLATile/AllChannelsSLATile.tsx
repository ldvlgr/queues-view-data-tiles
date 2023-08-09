import React from 'react';
import { Icon, useFlexSelector } from '@twilio/flex-ui';
import { TileWrapper, Summary, Chart, Description, Channel, Label, Metric, SLPct } from './AllChannelsSLATile.Components';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { mockQueuesData } from '../../utils/mockQueuesData';
import { PieChart } from "react-minimal-pie-chart";
import { WorkerQueue } from '@twilio/flex-ui/src/state/QueuesState';
import { AppState } from '../../flex-hooks/states';
import { SLMetrics } from '../../types';

interface ComponentProps {
    colors: {
        [key: string]: string;
    }
  }
const AllChannelsSLATile = (props: ComponentProps) => {
    const sla: SLMetrics = useFlexSelector((state: AppState) => {
      const queues: WorkerQueue[] = Object.values(state.flex.realtimeQueues.queuesList);
      return  QueueDataUtil.getSLTodayByChannel(queues); 
    });
    const { colors } = props;
    const handledVoice = sla.voice.handledTasks || 0;
    const handledChat = sla.chat.handledTasks || 0;
    const handledSMS = sla.sms.handledTasks || 0;
    const slPctVoice = sla.voice.serviceLevelPct;
    const slPctChat = sla.chat.serviceLevelPct;
    const slPctSMS = sla.sms.serviceLevelPct;
    let data = [];
    if (handledVoice) data.push({ title: 'voice', value: handledVoice, color: colors.voice });
    if (handledChat) data.push({ title: 'chat', value: handledChat, color: colors.chat });
    if (handledSMS) data.push({ title: 'sms', value: handledSMS, color: colors.sms });
    return (
        <TileWrapper className='Twilio-AggregatedDataTile'>
            <Summary>
                <Description className='Twilio-AggregatedDataTile-Description'>Channel SLA Today</Description>
                <Channel>
                    <Icon icon='Call' />
                    <Label bgColor={colors.voice}>Voice:</Label>
                    {handledVoice > 0 ?
                        <SLPct value={slPctVoice}> {slPctVoice}% </SLPct>
                        : <Metric> - </Metric>
                    }
                </Channel>
                <Channel>
                    <Icon icon='Message' />
                    <Label bgColor={colors.chat}>Chat:</Label>
                    {handledChat > 0 ?
                        <SLPct value={slPctChat}> {slPctChat}% </SLPct>
                        : <Metric> - </Metric>
                    }
                </Channel>
                <Channel>
                    <Icon icon='Sms' />
                    <Label bgColor={colors.sms}>SMS:</Label>
                    {handledSMS > 0 ?
                        <SLPct value={slPctSMS}> {slPctSMS}% </SLPct>
                        : <Metric> - </Metric>
                    }
                </Channel>
                <Description className='Twilio-AggregatedDataTile-Description'>Handled Tasks &rarr;</Description>
            </Summary>
            <Chart>
                <PieChart
                    labelStyle={{
                        fontSize: '14px', fill: 'Black'
                    }}
                    data={data}
                    label={({ dataEntry }) => dataEntry.value}
                />
            </Chart>
        </TileWrapper>
    )
}

export default AllChannelsSLATile;
