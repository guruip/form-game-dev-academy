export type ApiResponseItem = {
  hasError: boolean,
  errors: [],
  total: number,
  userInfo: {
    userId: number;
    userName: string;
    userAvatar: string;
    userRole: number;
  };
  tokens: {
    token: string,
    refreshToken: string
  };
};
