import { Ship } from './ship';
import { Point } from '../point';

export class LinearShip extends Ship {
    constructor(
        imgSrc: string,
        position: Point,
        width: number,
        height: number,
        public deltaX: number,
        public deltaY: number
    ) {
        super(imgSrc, position, width, height);
    }

    tick(): void {
        // adjust ship's position
        this.position.x += this.deltaX;
        this.position.y += this.deltaY;
    }

}