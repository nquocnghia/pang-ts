import { Ship } from '../ship';
import { IShip } from '../iship';
import { Player } from '../player';
import { EventPlayerUpgraded, EventShipDestroyed } from '../../event/game-event';
import { Point } from '../../point';
import { ShipSide } from '../ship-side';
import { ItemMove } from '../move-strategy/item-move';

export abstract class Item extends Ship {
    constructor(
        imgSrc: string,
        width: number,
        height: number
    ) {
        super(imgSrc, new Point(0, 0), width, height, new ItemMove(), ShipSide.PLAYER);
    }

    canCollideWith(that: IShip): boolean {
        return that instanceof Player;
    }

    collisionHandler(that: IShip): void {
        this.notify(new EventPlayerUpgraded(this, this.makeDecoratedShip(that as Player)));
        this.notify(new EventShipDestroyed(this));
    }

    abstract makeDecoratedShip(player: Player): IShip;
}