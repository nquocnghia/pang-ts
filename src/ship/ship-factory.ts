import { Point } from '../point';
import { Player } from './player';
import { Bullet } from './bullet';
import { Enemy } from './enemy';
import { BouncingMove } from './move-strategy/bouncing-move';
import { CircularMove } from './move-strategy/circular-move';

export class ShipFactory {
    static makePlayer(): Player {
        return new Player();
    }

    static makeEnemy1(position: Point): Enemy {
        return new Enemy('enemyBlack1.png', position, 53, 48, new BouncingMove(5, 0));
    }

    static makeEnemy2(position: Point): Enemy {
        return new Enemy('enemyBlack2.png', position, 64, 52, new BouncingMove(-5, 0));
    }

    static makeEnemy3(origin: Point, radius: number, angle: number, deltaT: number): Enemy {
        return new Enemy('enemyBlack3.png', new Point(0, 0), 59, 48, new CircularMove(origin, radius, angle, deltaT));
    }

    static makePlayerBullet(player: Player): Bullet {
        return new Bullet('laserBlue01.png', player, 5, 32, -10);
    }

    static makeEnemyBullet(enemy: Enemy): Bullet {
        return new Bullet('laserRed01.png', enemy, 5, 32, 10);
    }
}