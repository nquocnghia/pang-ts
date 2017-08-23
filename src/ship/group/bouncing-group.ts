import { GroupShip } from './group-ship';
import { BouncingMove } from '../move-strategy/bouncing-move';
import { ShipSide } from '../ship-side';

export class BouncingGroup extends GroupShip {
    constructor(mover: BouncingMove) {
        super(ShipSide.ENEMY, mover);
    }

    tick(): void {
        super.tick();
        this.mover.move(this);
    }

    set left(val: number) {
        const delta = val - this.left;
        this.ships.forEach(s => s.left += delta);
    }

    set top(val: number) {
        const delta = val - this.top;
        this.ships.forEach(s => s.top += delta);
    }

    /**
     * These getters must be overridden here because the relative setters have also been overridden
     * otherwise they will return undefined when being called (thanks typescript -_-)
     */

    get left(): number {
        return super.left;
    }

    get top(): number {
        return super.left;
    }
}