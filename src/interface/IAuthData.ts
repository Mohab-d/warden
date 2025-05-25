interface IAuthData<T> {
  accessToken: string;
  refreshToken?: string;
}

export default IAuthData;
