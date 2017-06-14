import { Component } from '@angular/core';


@Component({
    selector: 'charts',
    templateUrl: 'charts.html'
})
export class ChartsComponent {

    text: string;

    constructor() {
        console.log('Hello ChartsComponent Component');
        this.text = 'Hello World';
    }

}
