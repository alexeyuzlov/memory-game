import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { shuffle } from 'src/app/shuffle';

export interface Card {
  id: number;
  url: string;
  solvedByUserId: number | null;
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
        url: `https://placekitten.com/${index + 1}${index + 1}${index + 1}/${index + 1}${index + 1}${index + 1}`
      }
    });

    return of(list).pipe(
      map((items) => {
        const cards = items.reduce((prev: Card[], current) => {
          const card1: Card = {
            id: Math.random(),
            url: current.url,
            solvedByUserId: null,
          };

          const card2: Card = {
            id: Math.random(),
            url: current.url,
            solvedByUserId: null,
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
