
import React from 'react';
import { useFlexSelector } from '@twilio/flex-ui';
import { TileWrapper, Title, Summary, Chart, Group, Label, Metric, SLPct } from './GroupsChartTile.Components';

import QueueDataUtil from '../../utils/QueueDataUtil';
import { PieChart } from 'react-minimal-pie-chart';
import { WorkerQueue } from '@twilio/flex-ui/src/state/QueuesState';
import { AppState } from '../../flex-hooks/states';
import { SLMetrics } from '../../types';
import { Data } from 'react-minimal-pie-chart/types/commonTypes';

interface ComponentProps {
    groups: string[];
    colors: string[];
}

const GroupsChartTile = (props: ComponentProps) => {
    const { colors, groups } = props;
    const sla: SLMetrics = useFlexSelector((state: AppState) => {
        const queues: WorkerQueue[] = Object.values(state.flex.realtimeQueues.queuesList);
        return QueueDataUtil.getSLTodayByQueueGroups(queues, groups);
    });
    const count = groups.length;

    const handled1 = sla[groups[0]].handledTasks || 0;
    const slPct1 = sla[groups[0]].serviceLevelPct;
    const handled2 = sla[groups[1]].handledTasks || 0;
    const slPct2 = sla[groups[1]].serviceLevelPct;

    let handled3 = 0, handled4 = 0;
    let slPct3 = 0, slPct4 = 0;
    if (count > 2) {
        handled3 = sla[groups[2]].handledTasks || 0;
        slPct3 = sla[groups[2]].serviceLevelPct;
    }
    if (count > 3) {
        handled4 = sla[groups[3]].handledTasks || 0;
        slPct4 = sla[groups[3]].serviceLevelPct;
    }

    let data: Data = [];
    if (handled1) data.push({ title: groups[0], value: handled1, color: colors[0] });
    if (handled2) data.push({ title: groups[1], value: handled2, color: colors[1] });
    if (handled3) data.push({ title: groups[2], value: handled3, color: colors[2] });
    if (handled4) data.push({ title: groups[3], value: handled4, color: colors[3] });

    return (
        <TileWrapper className='Twilio-AggregatedDataTile'>
            <Summary>
                <Title>SLA Today</Title>
                <Group>
                    <Label bgColor={colors[0]}>{groups[0]}:</Label>
                    {handled1 > 0 ?
                        <SLPct value={slPct1}> {slPct1}% </SLPct>
                        : <Metric> - </Metric>
                    }
                </Group>
                <Group>
                    <Label bgColor={colors[1]}>{groups[1]}:</Label>
                    {handled2 > 0 ?
                        <SLPct value={slPct2}> {slPct2}% </SLPct>
                        : <Metric> - </Metric>
                    }
                </Group>
                <Group>
                    <Label bgColor={colors[2]}>{groups[2]}:</Label>
                    {handled3 > 0 ?
                        <SLPct value={slPct3}> {slPct3}% </SLPct>
                        : <Metric> - </Metric>
                    }
                </Group>
                <Group>
                    <Label bgColor={colors[3]}>{groups[3]}:</Label>
                    {handled4 > 0 ?
                        <SLPct value={slPct4}> {slPct4}% </SLPct>
                        : <Metric> - </Metric>
                    }
                </Group>
            </Summary>
            <Chart>
                <Title>Handled Today</Title>
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

export default GroupsChartTile;
