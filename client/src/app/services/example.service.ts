import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  ageSig = signal<number>(0);

  updateAgeSig(): void {
    let counter = this.ageSig() + 4.235;

    this.ageSig.set(counter);
  }
}

// number: number = 0;

// increament(): void {
//   this.number = 4;
// }