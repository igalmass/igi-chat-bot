import React, {ReactElement} from "react";
import styled from "@emotion/styled";


interface Props {
    // prop1: string
}

const MessagesDiv = styled('div')`
  background-color: #6d9886;
  height: 100%;
  flex-grow: 1;
`;

const MessagesComponent: React.FC<Props> = (props: Props): ReactElement => {
    return <MessagesDiv>
        Hi ! I'm MessagesComponent Component!
    </MessagesDiv>
}

export default MessagesComponent;
