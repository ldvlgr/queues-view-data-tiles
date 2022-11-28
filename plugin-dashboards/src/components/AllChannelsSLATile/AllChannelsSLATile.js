import * as React from "react";
import { TileWrapper, Summary, Chart, Description, Channel, Label, Metric, SLPct } from "./AllChannelsSLATile.Components"
import { cx } from "emotion";

import { connect } from "react-redux";
import QueueDataUtil from "../../utils/QueueDataUtil";
import PieChart from 'react-minimal-pie-chart';

const AllChannelsSLATile = connect((state) => {
    const queues = Object.values(state.flex.realtimeQueues.queuesList);
    return QueueDataUtil.getSLTodayByChannel(queues);
    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {
    //props has all task counts

    const { className, colors } = props;
    const handledVoice = props.voice.handledTasks;
    const handledChat = props.chat.handledTasks;
    const handledSMS = props.sms.handledTasks;

    const slPctVoice = props["voice"].serviceLevelPct;
    const slPctChat = props["chat"].serviceLevelPct;
    const slPctSMS = props["sms"].serviceLevelPct;
    let data = [];
    if (handledVoice) data.push({ title: 'voice', value: handledVoice, color: colors.voice });
    if (handledChat) data.push({ title: 'chat', value: handledChat, color: colors.chat });
    if (handledSMS) data.push({ title: 'sms', value: handledSMS, color: colors.sms });

    return (
        <TileWrapper className={cx("Twilio-AggregatedDataTile", className)}>
            <Summary>
                <Description className="Twilio-AggregatedDataTile-Description">Channel SLA Today</Description>
                {handledVoice &&
                    <Channel>
                        <Label bgColor={colors.voice}>Voice:&nbsp;</Label>
                        <SLPct value={slPctVoice}> {slPctVoice}% </SLPct>
                    </Channel>
                }
                {handledChat &&
                    <Channel>
                        <Label bgColor={colors.chat}>Chat:&nbsp;</Label>
                        <SLPct value={slPctChat}> {slPctChat}% </SLPct>
                    </Channel>
                }
                {handledSMS &&
                    <Channel>
                        <Label bgColor={colors.sms}>SMS:&nbsp;</Label>
                        <SLPct value={slPctSMS}> {slPctSMS}% </SLPct>
                    </Channel>
                }
            </Summary>
            <Chart>
                <PieChart
                    labelStyle={{
                        fontSize: '14px', fill: 'Black'
                    }}
                    data={data}
                    label={true}
                />
            </Chart>

        </TileWrapper>
    )
});

export default AllChannelsSLATile;
