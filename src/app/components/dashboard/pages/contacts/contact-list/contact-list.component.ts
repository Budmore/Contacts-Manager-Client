import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Contact } from "../../../../../services/contacts.service";

@Component({
  selector: "app-contact-list",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./contact-list.component.html",
})
export class ContactListComponent implements OnInit, OnChanges {
  @Input() contacts: Contact[] = [];
  @Input() isLoading = false;
  @Input() error = "";
  @Output() contactSelect = new EventEmitter<Contact>();

  searchTerm = "";
  filteredContacts: Contact[] = [];

  ngOnInit() {
    this.filterContacts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["contacts"]) {
      this.filterContacts();
    }
  }

  filterContacts() {
    if (!this.contacts) {
      this.filteredContacts = [];
      return;
    }

    if (!this.searchTerm) {
      this.filteredContacts = this.contacts;
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredContacts = this.contacts.filter(
        (contact) =>
          contact.firstname.toLowerCase().includes(searchLower) ||
          contact.lastname.toLowerCase().includes(searchLower) ||
          contact.email?.toLowerCase().includes(searchLower)
      );
    }
  }

  getNextEventDays(contact: Contact): number | null {
    if (!contact.dates || contact.dates.length === 0) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextEvents = contact.dates
      .map((date) => {
        const eventDate = new Date(date.date);
        eventDate.setFullYear(today.getFullYear());
        if (eventDate < today) {
          eventDate.setFullYear(today.getFullYear() + 1);
        }
        return eventDate;
      })
      .sort((a, b) => a.getTime() - b.getTime());

    const nextEvent = nextEvents[0];
    const diffTime = Math.abs(nextEvent.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }
}
