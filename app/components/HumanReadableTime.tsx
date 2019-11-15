import React, { SFC } from "react";

import CustomText from "./CustomText";

interface Props {
    durationInSeconds: number;
}

const HumanReadableTime: SFC<Props> = (props) => {
    const durationInMinutes = Math.round(props.durationInSeconds / 60);
    const remainderInSeconds = props.durationInSeconds % 60;

    return (
        <CustomText>
            { durationInMinutes }:{ remainderInSeconds }
        </CustomText>
    );
};

export default HumanReadableTime;