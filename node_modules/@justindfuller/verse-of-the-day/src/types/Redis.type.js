export type Client = {
  expireAsync(): Promise<boolean>;
  hgetallAsync(): Promise<boolean>;
  HMSETAsync(): Promise<boolean>;
}

export type Config = {
  host: ?string;
  port: ?string;
  password: ?string;
}
