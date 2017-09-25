import { Item } from './item';
import { IShip } from '../iship';
import { Player } from '../player';
import { ShipWithShield } from '../decorator/ship-with-shield';

export class Shield extends Item {
    constructor() {
        super('shield_bronze.png', 30, 30);
    }

    makeDecoratedShip(player: Player): IShip {
        return new ShipWithShield(player);
    }
}