import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { TokenService } from "./token.service";

interface AuthResponse {
  token: string;
  user: {
    email: string;
    id: string;
  };
}

interface UserProfile {
  id: string;
  email: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private apiUrl = `${environment.apiBaseUrl}${environment.apiVersion}`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.checkAuth();
  }

  private checkAuth() {
    if (this.tokenService.getToken()) {
      this.getCurrentUser().subscribe({
        next: () => {
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(["/dashboard/contacts"]);
        },
        error: () => {
          this.tokenService.removeToken();
          this.isAuthenticatedSubject.next(false);
          this.router.navigate(["/login"]);
        },
      });
    } else {
      this.router.navigate(["/login"]);
    }
  }

  getCurrentUser(): Observable<UserProfile> {
    return this.http
      .get<UserProfile>(`${this.apiUrl}/me`)
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.tokenService.setToken(response.token);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(this.handleError)
      );
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, { email, password })
      .pipe(catchError(this.handleError));
  }

  resetPassword(email: string): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/forgot-password`, { email })
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      complete: () => {
        this.tokenService.removeToken();
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(["/login"]);
      },
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An error occurred";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || "Server error";
    }
    return throwError(() => errorMessage);
  }
}
