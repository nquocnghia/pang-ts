import { GroupShip } from './group-ship';
import { ShipSide } from '../ship-side';
import { NopeMove } from '../move-strategy/nope-move';
import { Point } from '../../point';
import { BouncingMove } from '../move-strategy/bouncing-move';
import { Constant } from '../../constant';

export class CircularGroup extends GroupShip {
    private deltaX = -5;

    private counter = 0;
    private INTERVAL = 5 * Constant.FPS;

    constructor(private origin: Point) {
        super(ShipSide.ENEMY, new NopeMove());
    }

    tick(): void {
        super.tick();
        this.mover.move(this);

        // this group stands for {INTERVAL} frames at GAME_CENTER_X
        // then moves then bounces at screen borders until it reaches GAME_CENTER_X
        if (this.mover instanceof NopeMove && this.counter++ === this.INTERVAL) {
            this.counter = 0;
            this.mover = new BouncingMove(this.deltaX, 0);
        } else if (this.mover instanceof BouncingMove && this.origin.x === Constant.GAME_CENTER_X) {
            this.deltaX = this.mover.deltaX;
            this.mover = new NopeMove();
        }
    }

    set left(val: number) {
        const delta = val - this.left;
        this.origin.x += delta;
    }

    set top(val: number) {
        const delta = val - this.top;
        this.origin.y += delta;
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