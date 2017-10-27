import { Point } from '../point';
import { Player } from './player';
import { Bullet } from './bullet';
import { Enemy } from './enemy';
import { BouncingMove } from './move-strategy/bouncing-move';
import { CircularMove } from './move-strategy/circular-move';
import { NopeMove } from './move-strategy/nope-move';
import { BouncingGroup } from './group/bouncing-group';
import { IShip } from './iship';
import { Boss } from './boss';

export class ShipFactory {
    static makePlayer(): Player {
        return new Player();
    }

    static makeEnemy1(position: Point): Enemy {
        return new Enemy('enemyBlack1.png', position, 53, 48, new NopeMove());
    }

    static makeEnemy2(position: Point): Enemy {
        return new Enemy('enemyBlack2.png', position, 64, 52, new NopeMove());
    }

    static makeEnemy3(origin: Point, radius: number, angle: number, deltaT: number): Enemy {
        return new Enemy('enemyBlack3.png', new Point(0, 0), 59, 48, new CircularMove(origin, radius, angle, deltaT));
    }

    static makePlayerBullet(player: IShip): Bullet {
        return new Bullet('laserBlue01.png', player, 5, 32, -10);
    }

    static makeEnemyBullet(enemy: Enemy): Bullet {
        return new Bullet('laserRed01.png', enemy, 5, 32, 10);
    }

    static makeBouncingGroup(deltaX: number, deltaY: number): BouncingGroup {
        return new BouncingGroup(new BouncingMove(deltaX, deltaY));
    }

    static makeBoss(): Boss {
        return new Boss();
    }

    static makeBossBullets(boss: Boss): Bullet[] {
        const leftBullet = new Bullet('laserRed08.png', boss, 48, 46, Math.floor(Math.random() * 4) + 3);
        leftBullet.centerX = boss.left;
        leftBullet.top = boss.top + Math.floor(boss.height / 2);

        const rightBullet = new Bullet('laserRed08.png', boss, 48, 46, Math.floor(Math.random() * 4) + 3);
        rightBullet.centerX = boss.right;
        rightBullet.top = boss.top + Math.floor(boss.height / 2);

        return [
            leftBullet,
            new Bullet('laserRed08.png', boss, 48, 46, Math.floor(Math.random() * 4) + 3),
            rightBullet
        ];
    }
}