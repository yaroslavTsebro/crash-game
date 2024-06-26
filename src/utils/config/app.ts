import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { IsBoolean, IsNumber, IsOptional, IsString, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
dotenv.config();

class AppConfig {
  @IsString()
  DB_HOST!: string;

  @IsNumber()
  DB_PORT!: number;

  @IsString()
  DB_NAME!: string;

  @IsString()
  DB_USER!: string;

  @IsBoolean()
  DB_DEBUG!: boolean;

  @IsString()
  @IsOptional()
  DB_PASSWORD?: string;

  @IsNumber()
  APP_PORT!: number;

  constructor() {
    const env = process.env;
    this.DB_HOST = env.DB_HOST!;
    this.DB_PORT = Number(env.DB_PORT);
    this.DB_NAME = env.DB_NAME!;
    this.DB_USER = env.DB_USER!;
    this.DB_PASSWORD = env.DB_PASSWORD;
    this.DB_DEBUG = !!env.DB_DEBUG;
    this.APP_PORT = Number(env.APP_PORT);
  }

  static async validate(config: AppConfig) {
    const errors = await validate(config);
    if (errors.length > 0) {
      throw new Error(`Validation failed! ${errors}`);
    }
  }
}

const appConfig = plainToClass(AppConfig, process.env);

export const validateConfig = async () => {
  await AppConfig.validate(appConfig);
};

export default appConfig;