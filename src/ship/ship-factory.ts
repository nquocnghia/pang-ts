import { BouncingEnemy } from './bouncing-enemy';
import { Point } from '../point';
import { Player } from './player';
import { CircularEnemy } from './circular-enemy';

export class ShipFactory {
    static makePlayer(): Player {
        return new Player();
    }

    static makeEnemy1(position: Point): BouncingEnemy {
        return new BouncingEnemy('enemyBlack1.png', position, 53, 48, 5, 0);
    }

    static makeEnemy2(position: Point): BouncingEnemy {
        return new BouncingEnemy('enemyBlack2.png', position, 64, 52, -5, 0);
    }

    static makeEnemy3(origin: Point, radius: number, angle: number, deltaT: number): CircularEnemy {
        return new CircularEnemy('enemyBlack3.png', 59, 48, origin, radius, angle, deltaT);
    }
}