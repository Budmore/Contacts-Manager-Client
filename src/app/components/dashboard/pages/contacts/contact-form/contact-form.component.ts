import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact, ContactDate } from '../../../../../services/contacts.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact | null = null;
  @Output() save = new EventEmitter<Partial<Contact>>();
  @Output() cancel = new EventEmitter<void>();

  formData: Partial<Contact> = {
    firstname: '',
    lastname: '',
    dates: []
  };

  dateTypes = ['BIRTHDATE', 'NAMEDATE', 'CUSTOM'];

  ngOnInit() {
    if (this.contact) {
      this.formData = { ...this.contact };
    }
  }

  addDate() {
    this.formData.dates = [...(this.formData.dates || []), {
      type: 'BIRTHDATE',
      date: new Date().toISOString()
    }];
  }

  removeDate(index: number) {
    this.formData.dates = this.formData.dates?.filter((_, i) => i !== index);
  }

  onSubmit() {
    this.save.emit(this.formData);
  }
}