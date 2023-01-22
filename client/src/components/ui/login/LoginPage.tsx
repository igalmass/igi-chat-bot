import React, {FormEvent, ReactElement, useState} from "react";
import _ from "lodash";
import {TextField} from "@mui/material";
import {MainDiv, FormDiv, MyButton} from './LoginPageStyled'

interface Props {
    connectHandler: (userName: string) => void
}

const LoginPage: React.FC<Props> = (props: Props): ReactElement => {
    const [userName, setUserName] = useState("Bilbo Hagadol " + _.random(1, 1000000));


    const onUserNameChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.connectHandler(userName);
    }


    return <MainDiv>
        <h2>Welcome to the chat</h2>
        <h3>Robin the bot is waiting just for you!</h3>
        <h3>Please enter your name and click the "Connect" button</h3>
        <form onSubmit={onSubmit}>
            <FormDiv>
                <TextField variant="outlined" inputProps={{minLength: 12}} required value={userName} name="userName"
                           onChange={onUserNameChangedHandler} label="User Name:" aria-label="User Name"/>
                <MyButton variant="outlined" type="submit">Connect</MyButton>
            </FormDiv>
        </form>
    </MainDiv>
}

export default LoginPage;
