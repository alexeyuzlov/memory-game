import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { shuffle } from 'src/app/shuffle';

export interface Card {
  id: number;
  url: string;
  solvedBySocketId: string | null;
}

interface CardResponse {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  public getAll(): Observable<Card[]> {
    const list: CardResponse[] = Array.from(Array(8)).map((item, index) => {
      return {
        url: `/assets/cards/00${index + 1}.jpg`
      }
    });

    return of(list).pipe(
      map((items) => {
        const cards = items.reduce((prev: Card[], current) => {
          const card1: Card = {
            id: Math.random(),
            url: current.url,
            solvedBySocketId: null,
          };

          const card2: Card = {
            id: Math.random(),
            url: current.url,
            solvedBySocketId: null,
          };

          return [
            ...prev,
            card1,
            card2,
          ]
        }, []);

        return shuffle(cards);
      })
    );
  }
}
