import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Card, CardsService } from 'src/app/cards.service';

const TIMER_IN_MS = 1000;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public cards: Card[] = [];

  public selected: number[] = [];

  public loading: boolean = false;

  public attemptsTotal: number = 0;

  // for sockets
  public currentUserId: number = Math.random();

  constructor(
    private _cardsService: CardsService,
  ) {
  }

  public ngOnInit() {
    this._cardsService.getAll().subscribe(
      (cards) => this.cards = cards
    );
  }

  public trackByFn(index: number, item: Card) {
    return item.id;
  }

  public select(card: Card) {
    if (this.loading) {
      return;
    }

    if (card.solvedByUserId) {
      return;
    }

    if (this.selected.includes(card.id)) {
      return;
    }

    this.selected = [...this.selected, card.id];

    if (this.selected.length === 2) {
      this.attemptsTotal++;

      const card1 = this.cards.find((c) => c.id === this.selected[0])!;
      const card2 = this.cards.find((c) => c.id === this.selected[1])!;

      if (card1.url === card2.url) {
        this.cards = this.cards.map((c) => {
          if (card1.url === c.url) {
            return {
              ...card1,
              solvedByUserId: this.currentUserId
            }
          }

          return c;
        });

        this.selected = [];
        return;
      }

      this.loading = true;
      setTimeout(() => {
        this.selected = [];
        this.loading = false;
      }, TIMER_IN_MS)
    }
  }
}
