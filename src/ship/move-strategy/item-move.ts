import { IShip } from '../iship';
import { LinearMove } from './linear-move';
import { Constant } from '../../constant';

export class ItemMove extends LinearMove {
    constructor() {
        super(0, 5);
    }

    move(ship: IShip): void {
        if (ship.bottom < Constant.GAME_BOTTOM) {
            super.move(ship);
        } else if (ship.bottom > Constant.GAME_BOTTOM) {
            ship.bottom = Constant.GAME_BOTTOM;
        }
    }
}