import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  public message = '';
  
  constructor() { }

  addMessage(message) {
    this.message = message;
  }

  clearMessage() {
    this.message = '';
  }
  
}
