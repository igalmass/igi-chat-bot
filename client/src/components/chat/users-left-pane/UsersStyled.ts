import styled from "@emotion/styled";
import {Button} from "@mui/material";

export const UsersMainDiv = styled('div')`
  background-color: #00bfbf;
  height: 100%;
  min-width: 200px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
`

export const UserDiv = styled('div')`
  margin-left: 10px;
  margin-right: 10px;
`

export const DisconnectButton = styled(Button)`
  margin: 20px;
`

export const ConnectedUsersLabel = styled('h3')`
    align-self: center;
`

