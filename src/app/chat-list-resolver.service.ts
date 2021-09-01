import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ChatResolver } from './chat-data';
import { ChatList } from './chat-list.service';

@Injectable({ providedIn: 'root' })
export class ChatListResolver implements Resolve<ChatResolver> {
  constructor(private chatService: ChatList) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ChatResolver> {
    return this.chatService.getChatList().pipe(
      map(contacts => ({ contacts })),
      catchError(error => {
        return of({ contacts: null, error: '404! Error, Page not found' });
      })
    );
  }
}
