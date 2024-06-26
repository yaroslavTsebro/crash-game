import { IsEmail, IsOptional, IsPositive, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  password!: string;

  @IsString()
  username!: string;
}

export class UserCreateDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}

export class UserProfileDto {
  username!: string;
  expense!: bigint;
  createdAt!: Date;

  constructor(username: string, expense: bigint, createdAt: Date){
    this.username = username;
    this.expense = expense;
    this.createdAt = createdAt;
  }
}

export class UserSelectDto {
  username!: string;
  email!: string;
}

export class UserUpdateDto {
  @IsPositive()
  id: number;

  @IsString()
  @IsOptional()
  email?: string;

  @IsOptional()
  isMuted?: boolean;

  constructor(id: number) {
    this.id = id;
  }
}