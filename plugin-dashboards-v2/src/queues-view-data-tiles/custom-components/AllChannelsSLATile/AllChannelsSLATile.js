import { Icon, useFlexSelector } from '@twilio/flex-ui';
import * as React from 'react';
import { getChannelIcon } from '../../utils/helpers';
import { mockQueuesData } from '../../utils/mockQueuesData';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { PieChart } from "react-minimal-pie-chart";
import { TileWrapper, Title, Summary, Chart, Channel, Label, Metric, SLPct } from './AllChannelsSLATile.Components'

const AllChannelsSLATile = (props) => {
    const { channelList, colors } = props;
    const sla = useFlexSelector((state) => {
        const queues = Object.values(state.flex.realtimeQueues.queuesList);
        return QueueDataUtil.getSLTodayByChannel(queues, channelList);
    });
    const data = [];
    channelList.forEach((ch) => {
        const handled = sla[ch]?.handledTasks || 0;
        if (handled) data.push({ title: ch, value: handled, color: colors[ch] });
    });
    return (
        <TileWrapper className="Twilio-AggregatedDataTile">
            <Summary>
                <Title>SLA Today</Title>
                {channelList.map((ch) => {
                    const handled = sla[ch]?.handledTasks || 0;
                    const slPct = sla[ch]?.serviceLevelPct;
                    return (
                        <Channel key={ch}>
                            <Icon icon={ getChannelIcon(ch) } />    
                            <Label bgColor={colors[ch]}>{ch}</Label>
                            {handled > 0 ? <SLPct value={slPct}> {slPct}% </SLPct> : <Metric> - </Metric>}
                        </Channel>
                    )
                })}
            </Summary>
            <Chart>
                <Title>Handled Today</Title>
                <PieChart
                    labelStyle={{
                        fontSize: '14px',
                        fill: 'Black',
                    }}
                    data={data}
                    label={({ dataEntry }) => dataEntry.value}
                />
            </Chart>
        </TileWrapper>
    );
};

export default AllChannelsSLATile;
