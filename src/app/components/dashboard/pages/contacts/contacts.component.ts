import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsService, Contact, ContactDate } from '../../../../services/contacts.service';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactFormComponent, ContactListComponent],
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  isLoading = false;
  error = '';
  selectedContact: Contact | null = null;
  showForm = false;

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.isLoading = true;
    this.error = '';
    
    this.contactsService.getContacts().subscribe({
      next: (response) => {
        this.contacts = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load contacts';
        this.isLoading = false;
      }
    });
  }

  onContactSelect(contact: Contact) {
    this.selectedContact = contact;
    this.showForm = true;
  }

  onNewContact() {
    this.selectedContact = null;
    this.showForm = true;
  }

  onSave(contactData: Partial<Contact>) {
    if (this.selectedContact) {
      this.contactsService.updateContact(this.selectedContact._id, contactData).subscribe({
        next: () => {
          this.loadContacts();
          this.showForm = false;
        },
        error: () => this.error = 'Failed to update contact'
      });
    } else {
      this.contactsService.createContact(contactData).subscribe({
        next: () => {
          this.loadContacts();
          this.showForm = false;
        },
        error: () => this.error = 'Failed to create contact'
      });
    }
  }
}