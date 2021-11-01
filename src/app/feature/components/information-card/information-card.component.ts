import { Component, Input } from '@angular/core';
import { Card } from '@core/models';

@Component({
    selector: 'app-information-card',
    templateUrl: './information-card.component.html',
    styleUrls: ['./information-card.component.scss'],
})
export class InformationCardComponent {
    @Input() cardData: Card;

    constructor() {}
}
