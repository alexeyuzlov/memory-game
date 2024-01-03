import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Card, CardsService } from 'src/app/cards.service';
import { ChatClientState } from './chat-client.state';

const TIMER_IN_MS = 1000;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isAdmin: boolean = false;

  public cards: Card[] = [];

  public selected: number[] = [];

  public blocking: boolean = false;

  public isMyTurn: boolean = false;

  public attemptsTotal: number = 0;

  public solvedTotal: number = 0;

  public outOfGame: boolean = true;

  public endGame: boolean = false;

  public socketId!: string;

  constructor(
    private _cardsService: CardsService,
    private _chatClientState: ChatClientState,
  ) {
  }

  public ngOnInit() {
    this.isAdmin = !!localStorage.getItem('admin');

    this._chatClientState.init();

    this._chatClientState.message$.subscribe((event) => {
      switch (event.type) {
        case 'restart':
          this.socketId = this._chatClientState.socket.id;
          this.cards = event.payload.cards;
          this.attemptsTotal = 0;
          this.solvedTotal = 0;
          this.outOfGame = false;
          this.isMyTurn = event.payload.current !== this.socketId;
          this.blocking = !this.isMyTurn;
          this.endGame = false;
          break;
        case 'select':
          this._select(event.payload);
          return;
        case 'turn':
          this.isMyTurn = event.payload.current !== this.socketId;
          this.blocking = !this.isMyTurn;
          return;
        case 'end':
          this.isMyTurn = false;
          this.blocking = true;
          this.endGame = true;
          return;
        default:
        // nothing
      }
    });
  }

  public trackByFn(index: number, item: Card) {
    return item.id;
  }

  public restart() {
    this._cardsService.getAll().subscribe(
      (cards) => {
        this._chatClientState.send({
          type: 'restart',
          payload: {
            cards,
          },
        });
      },
    );
  }

  public select(card: Card) {
    if (this.blocking) {
      return;
    }

    if (card.solvedBySocketId) {
      return;
    }

    if (this.selected.includes(card.id)) {
      return;
    }

    this._chatClientState.send({
      type: 'select',
      payload: {
        selected: card.id,
      },
    });
  }

  private _select(payload: { selected: number, current: string }) {
    this.selected = [...this.selected, payload.selected];

    if (this.selected.length === 2) {
      if (this.isMyTurn) {
        this.attemptsTotal++;
      }

      const card1 = this.cards.find((c) => c.id === this.selected[0])!;
      const card2 = this.cards.find((c) => c.id === this.selected[1])!;

      if (card1.url === card2.url) {
        this.cards = this.cards.map((c) => {
          if (card1.url === c.url) {
            return {
              ...card1,
              solvedBySocketId: payload.current,
            };
          }

          return c;
        });

        this.selected = [];

        if (this.isMyTurn) {
          this.solvedTotal++;
        }

        if (this.cards.filter(((c) => c.solvedBySocketId === null)).length === 0) {
          this._chatClientState.send({
            type: 'end',
            payload: {
              //
            },
          });
        }

        return;
      }

      this.blocking = true;

      setTimeout(() => {
        this.selected = [];

        if (this.isMyTurn) {
          this._chatClientState.send({
            type: 'turn',
            payload: {
              //
            },
          });
        }
      }, TIMER_IN_MS)
    }
  }
}
