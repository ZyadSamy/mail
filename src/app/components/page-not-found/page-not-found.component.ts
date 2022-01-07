import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: ` <div class="container">
    <h1 class="mat-display-2">404 Error, page not found</h1>
  </div>`,
  styles: [
    `.container
        height: 100vh
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        background-color: #323B48
        color: white
  `,
  ],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
