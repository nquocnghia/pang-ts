import { IMoveStrategy } from './imove-strategy';
import { Point } from '../../point';
import { IShip } from '../iship';

export class CircularMove implements IMoveStrategy {
    constructor(
        private origin: Point,
        private radius: number,
        private angle: number,
        private deltaT: number
    ) { }

    move(ship: IShip): void {
        ship.centerX = Math.floor(Math.cos(this.angle) * this.radius + this.origin.x);
        ship.centerY = Math.floor(Math.sin(this.angle) * this.radius + this.origin.y);

        this.angle += this.deltaT;
    }
}