import { LinearShip } from './linear-ship';
import { Constant } from '../constant';
import { Point } from '../point';

/**
 * This represents the player ship
 */
export class Player extends LinearShip {
    private VELX = 5;

    constructor() {
        super('assets/player_ship.png',
            new Point(0, 0),
            64, 48,
            0, 0
        );

        this.centerX = Constant.GAME_CENTER_X;
        this.bottom = Constant.GAME_BOTTOM;
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

    moveLeft(): void {
        this.deltaX = -this.VELX;
    }

    moveRight(): void {
        this.deltaX = this.VELX;
    }

    stop(): void {
        this.deltaX = 0;
    }
}