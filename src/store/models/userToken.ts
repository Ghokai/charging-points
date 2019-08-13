export interface UserToken {
  accessToken: string;
  expireIn: number;
  refreshToken: string;
  tokenType: string;
}
