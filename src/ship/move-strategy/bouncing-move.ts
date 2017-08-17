import { LinearMove } from './linear-move';
import { IShip } from '../iship';
import { Constant } from '../../constant';

export class BouncingMove extends LinearMove {
    constructor(
        deltaX: number,
        deltaY: number
    ) {
        super(deltaX, deltaY);
    }

    move(ship: IShip): void {
        super.move(ship);

        // adjust ship's movement: make it bounce
        if ((ship.left <= Constant.GAME_LEFT && this.deltaX < 0) || (ship.right >= Constant.GAME_RIGHT && this.deltaX > 0)) {
            this.deltaX *= -1;
        }

        if ((ship.top <= Constant.GAME_TOP && this.deltaY < 0) || (ship.bottom >= Constant.GAME_BOTTOM && this.deltaY > 0)) {
            this.deltaY *= -1;
        }
    }
}