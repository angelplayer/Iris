
const Token_ID = "hyouka_user_token";

export default class JwtService {
  public static getToken() {
    return window.localStorage.getItem(Token_ID);
  }
  public static setToken(token: string) {
    window.localStorage.setItem(Token_ID, token);
  }
  public static destroyToken() {
    window.localStorage.removeItem(Token_ID);
  }
}