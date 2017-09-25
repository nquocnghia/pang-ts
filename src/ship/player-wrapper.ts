import { StageScene } from '../scene/stage/stage-scene';
import { IShip } from './iship';
import { Bullet } from './bullet';
import { IObserver } from '../event/iobserver';
import { LinearMove } from './move-strategy/linear-move';
import { ShipFactory } from './ship-factory';
import { EventShipCreated, GameEvent, EventShipDestroyed } from '../event/game-event';
import { Constant } from '../constant';

export class PlayerWrapper implements IObserver {
    private VELX = 5;

    private lastBullet: Bullet = undefined;

    constructor(private scene: StageScene, private _player: IShip) {
        this.player.centerX = Constant.GAME_CENTER_X;
        this.player.bottom = Constant.GAME_BOTTOM;
    }

    get player(): IShip { return this._player; }

    set player(player: IShip) { this._player = player; }

    get mover(): LinearMove {
        return this._player.mover as LinearMove;
    }

    moveLeft(): void {
        this.mover.deltaX = -this.VELX;
    }

    moveRight(): void {
        this.mover.deltaX = this.VELX;
    }

    stop(): void {
        this.mover.deltaX = 0;
    }

    fire(): void {
        if (this.lastBullet === undefined) {
            this.lastBullet = ShipFactory.makePlayerBullet(this.player);
            this.lastBullet.attach(this);
            this.scene.update(new EventShipCreated(this.player, this.lastBullet));
        }
    }

    update(event: GameEvent): void {
        if (event instanceof EventShipDestroyed && event.observable === this.lastBullet) {
            this.lastBullet = undefined;
        }
    }
}