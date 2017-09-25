import { ShipDecorator } from './ship-decorator';
import { Enemy } from '../enemy';
import { GameEvent, EventShipDestroyed, EventShipCreated } from '../../event/game-event';
import { Item } from '../item/item';

export class EnemyCarryingItem extends ShipDecorator {
    constructor(ship: Enemy, private item: Item) {
        super(ship);
    }

    update(event: GameEvent): void {
        if (event instanceof EventShipDestroyed) {
            this.item.centerX = this.centerX;
            this.item.top = this.bottom;
            this.notify(new EventShipCreated(this, this.item));
        }
        super.update(event);
    }
}