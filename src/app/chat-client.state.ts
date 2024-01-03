import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatClientState {
  public socket!: Socket;

  public message$ = new Subject<ChatEvent>();

  public init() {
    this.socket = io(environment.chatUrl);

    this.socket.on('connect', () => {
      console.log('connected', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected');
    });

    this.socket.on('message', (body: ChatEvent) => {
      console.log('message', body);
      this.message$.next(body);
    });
  }

  public send(body: ChatEvent) {
    this.socket.emit('message', body);
  }
}

interface ChatEvent {
  type: string;
  payload: any;
}
