import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactDate {
  type: 'BIRTHDATE' | 'NAMEDATE' | string;
  date: string;
  year?: number;
  month?: number;
  day?: number;
  _id?: string;
}

export interface Contact {
  _id: string;
  _userid: string;
  firstname: string;
  lastname: string;
  email?: string;
  dates: ContactDate[];
  modified: string;
}

export interface ContactsResponse {
  count: number;
  data: Contact[];
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = `${environment.apiBaseUrl}/v1/contacts`;

  constructor(private http: HttpClient) {}

  getContacts(): Observable<ContactsResponse> {
    return this.http.get<ContactsResponse>(this.apiUrl);
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  createContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(id: string, contact: Partial<Contact>): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  }
}