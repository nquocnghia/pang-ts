import { Ship } from './ship';
import { IShip } from './iship';
import { Bullet } from './bullet';
import { ShipSide } from './ship-side';
import { Point } from '../point';
import { BouncingMove } from './move-strategy/bouncing-move';
import { Constant } from '../constant';
import { EventShipDestroyed, EventShipCreated } from '../event/game-event';
import { ShipFactory } from './ship-factory';

export class Boss extends Ship {
    public readonly MAX_HP = 10;
    private _hp = this.MAX_HP;

    private readonly INTERVAL = Constant.FPS;
    private frameCounter = 0;

    constructor() {
        super('boss.png',
            new Point(0, 0),
            398, 255,
            new BouncingMove(5, 0),
            ShipSide.ENEMY
        );

        this.centerX = Constant.GAME_CENTER_X;
        this.top = 50;
    }

    tick(): void {
        super.tick();

        if (this.frameCounter++ === this.INTERVAL) {
            this.frameCounter = 0;

            ShipFactory
                .makeBossBullets(this)
                .forEach(bullet => this.notify(new EventShipCreated(this, bullet)));
        }
    }

    canCollideWith(that: IShip): boolean {
        return that instanceof Bullet && that.side === ShipSide.PLAYER;
    }

    collisionHandler(that: IShip): void {
        if (--this.hp === 0) {
            this.notify(new EventShipDestroyed(this));
        }
    }

    get hp(): number { return this._hp; }

    set hp(val: number) { this._hp = val; }
}