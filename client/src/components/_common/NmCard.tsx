import React, {ReactElement} from "react";
import styled from "@emotion/styled";

type Props = {
    // prop1: string
    children?: React.ReactNode,
    style?: React.CSSProperties
}

const RootDiv = styled.div`
  border: 1px solid grey;
  text-align: left;
  margin: 10px;
  box-shadow: 5px 10px #888887;
  border-radius: 20px;
`

const ChildrenWrapper = styled("div")`
  padding-left: 5px;
  padding-right: 5px;
`
const NmCard: React.FC<Props> = ({children, style}): ReactElement => {
    return <RootDiv style={style}>
        <ChildrenWrapper>
            {children}
        </ChildrenWrapper>
    </RootDiv>
}

export default NmCard;
