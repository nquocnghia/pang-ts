import { Ship } from './ship';
import { Point } from '../point';

export class CircularEnemy extends Ship {
    constructor(
        imgSrc: string,
        width: number,
        height: number,
        private origin: Point,
        private radius: number,
        private angle: number,
        private deltaT: number
    ) {
        super(imgSrc, new Point(0, 0), width, height);
    }

    tick(): void {
        this.centerX = Math.floor(Math.cos(this.angle) * this.radius + this.origin.x);
        this.centerY = Math.floor(Math.sin(this.angle) * this.radius + this.origin.y);

        this.angle += this.deltaT;
    }
}