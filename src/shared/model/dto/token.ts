import { UserState, UserStatus } from '../../contracts/entity/user';

export class TokenDto {
  id: string;
  username: string;
  status: UserStatus;
  state: UserState;

  constructor(id: string, email: string, status: UserStatus, state: UserState) {
    this.id = id;
    this.username = email;
    this.status = status;
    this.state = state;
  }
}