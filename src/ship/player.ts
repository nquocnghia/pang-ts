import { Ship } from './ship';
import { Constant } from '../constant';
import { Point } from '../point';
import { EventShipDestroyed } from '../event/game-event';
import { Bullet } from './bullet';
import { IShip } from './iship';
import { LinearMove } from './move-strategy/linear-move';
import { ShipSide } from './ship-side';
import { Item } from './item/item';

/**
 * This represents the player ship
 */
export class Player extends Ship {
    constructor() {
        super('player_ship.png',
            new Point(0, 0),
            64, 48,
            new LinearMove(0, 0),
            ShipSide.PLAYER
        );
    }

    tick(): void {
        // move the ship
        super.tick();

        // stop the ship when it reaches the borders
        if (this.left <= Constant.GAME_LEFT) {
            this.left = Constant.GAME_LEFT;
        } else if (this.right >= Constant.GAME_RIGHT) {
            this.right = Constant.GAME_RIGHT;
        }
    }

    canCollideWith(that: IShip): boolean {
        return (that instanceof Bullet && that.side !== this.side) || that instanceof Item;
    }

    collisionHandler(that: IShip): void {
        if (that instanceof Bullet) {
            this.notify(new EventShipDestroyed(this));
        }
    }

    get mover(): LinearMove {
        return super.mover as LinearMove;
    }

    set mover(val: LinearMove) {
        super.mover = val;
    }
}