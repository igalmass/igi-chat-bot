import React, {ReactElement} from "react";

interface Props {
    // prop1: string
    disconnectHandler: () => void
}

const ChatPage: React.FC<Props> = (props: Props): ReactElement => {
    const onDisconnectButtonClicked = () => {
        props.disconnectHandler();
    }

    return <div style={{border: '1px solid blue', padding: '10px'}}>
        Hi ! I'm ChatPage Component!
        <button onClick={onDisconnectButtonClicked}>Disconnect</button>
    </div>
}

export default ChatPage;
