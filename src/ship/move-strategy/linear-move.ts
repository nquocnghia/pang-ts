import { IMoveStrategy } from './imove-strategy';
import { IShip } from '../iship';

export class LinearMove implements IMoveStrategy {
    constructor(
        public deltaX: number,
        public deltaY: number
    ) { }

    move(ship: IShip): void {
        // adjust ship's position
        ship.left += this.deltaX;
        ship.top += this.deltaY;
    }
}