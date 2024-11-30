import { Injectable } from "@angular/core";
import Cookies from "js-cookie";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  private readonly TOKEN_KEY = "auth_token";

  setToken(token: string): void {
    Cookies.set(this.TOKEN_KEY, token, {
      expires: 1, // 24 hours
      secure: true,
      sameSite: "strict",
    });
  }

  getToken(): string | undefined {
    return Cookies.get(this.TOKEN_KEY);
  }

  removeToken(): void {
    Cookies.remove(this.TOKEN_KEY, {
      path: "/",
      secure: true,
      sameSite: "strict",
    });
  }
}
