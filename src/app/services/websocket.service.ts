import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ENVIRONMENT } from '@Environments/environment';
import { WebsocketGateway } from '@Enums/websockets/websocket-gateway.enum';
import { WebsocketEvent } from '@Enums/websockets/websocket-event.enum';

@Injectable()
export class WebsocketService {
  readonly socket = signal<Socket | null>(null);

  connect(gateway: WebsocketGateway, path?: string): void {
    const server = path ? `${ENVIRONMENT.api_url}/${gateway}/${path}` : `${ENVIRONMENT.api_url}/${gateway}`;
    const socket = io(server);

    this.socket.set(socket);
  }

  disconnect(): void {
    this.socket()?.disconnect();
  }

  listen(event: WebsocketEvent, callback: (data: any) => void): void {
    this.socket()?.on(event, callback);
  }

  stopListening(event: WebsocketEvent, callback: (data: any) => void): void {
    this.socket()?.off(event, callback);
  }

  stopListeningAll(event?: WebsocketEvent): void {
    if (event) {
      this.socket()?.off(event);
      return;
    }
    this.socket()?.off();
  }
}
