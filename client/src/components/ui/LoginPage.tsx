import React, {FormEvent, ReactElement, useState} from "react";
import _ from "lodash";

interface Props {
    // prop1: string
    connectHandler: (userName: string) => void
}

const LoginPage: React.FC<Props> = (props: Props): ReactElement => {
    const [userName, setUserName] = useState("Dando Hagadol " + _.random(1, 1000000));

    const onUserNameChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.connectHandler(userName);
    }

    return <div style={{border: '1px solid blue', padding: '10px'}}>
        Hi ! I'm LoginPage Component!
        <form onSubmit={onSubmit}>
            <label htmlFor="userName">User name:</label>
            <input type="text" name="userName" onChange={onUserNameChangedHandler} value={userName} minLength={8} required/>
            <button type="submit">Connect</button>
        </form>
    </div>
}

export default LoginPage;
