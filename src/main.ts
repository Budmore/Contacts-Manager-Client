import { Routes } from "@angular/router";
import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, RouterModule } from "@angular/router";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { AuthGuard } from "./app/guards/auth.guard";
import { AuthInterceptor } from "./app/interceptors/auth.interceptor";

// Components
import { LoginComponent } from "./app/components/auth/login/login.component";
import { RegisterComponent } from "./app/components/auth/register/register.component";
import { ForgotPasswordComponent } from "./app/components/auth/forgot-password/forgot-password.component";
import { DashboardComponent } from "./app/components/dashboard/dashboard.component";
import { CalendarComponent } from "./app/components/dashboard/pages/calendar/calendar.component";
import { ContactsComponent } from "./app/components/dashboard/pages/contacts/contacts.component";
import { SettingsComponent } from "./app/components/dashboard/pages/settings/settings.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "calendar", component: CalendarComponent },
      { path: "contacts", component: ContactsComponent },
      { path: "settings", component: SettingsComponent },
      { path: "", redirectTo: "calendar", pathMatch: "full" },
    ],
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule],
  template: "<router-outlet></router-outlet>",
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
});
