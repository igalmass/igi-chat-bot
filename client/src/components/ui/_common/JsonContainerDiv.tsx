import React, {CSSProperties, ReactElement} from "react";
import NmCard from "./NmCard";

interface Props {
    theObject: any,
    style?: CSSProperties
}

const JsonContainerDiv: React.FC<Props> = ({theObject, style}): ReactElement => {
    return <NmCard style={{... style, ... { minHeight: 40, marginTop: 20}}}>
        <pre>
            {theObject}
            {/*{JSON.stringify(theObject, null, 4)}*/}
        </pre>
    </NmCard>

}

export default JsonContainerDiv;
