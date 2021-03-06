import { IScene } from '../iscene';
import { IShip } from '../../ship/iship';
import { StagePhase } from './stage-phase';
import { AssetManager } from '../../asset-manager';
import { Constant } from '../../constant';
import { Game } from '../../game';
import { PauseScene } from '../pause-scene';
import { IObserver } from '../../event/iobserver';
import { GameEvent, EventShipCreated, EventShipDestroyed, EventPlayerUpgraded } from '../../event/game-event';
import { GameOverScene } from '../game-over-scene';
import { Collision } from '../../ship/collision';
import { PlayerWrapper } from '../../ship/player-wrapper';

export abstract class StageScene implements IScene, IObserver {
    private bgImg: HTMLImageElement;

    protected ships: IShip[] = [];
    protected shipsToAdd: IShip[] = [];
    protected shipsToRemove: IShip[] = [];

    protected phase = StagePhase.INTRO;
    private counter = 0;
    private INTRO_DURATION_FRM: number; // in frame (computed value)

    protected playerWrapper: PlayerWrapper;

    constructor(private stageName: string, player: IShip, introDuration: number) {
        // load background image
        this.bgImg = AssetManager.getInstance().getAsset('bg.jpg');

        // calculate number of frames needed for intro
        this.INTRO_DURATION_FRM = introDuration * Constant.FPS;

        // init player
        this.playerWrapper = new PlayerWrapper(this, player);
        this.addShip(player);
    }

    tick(game: Game): void {
        switch (this.phase) {
            case StagePhase.INTRO:
                if (++this.counter === this.INTRO_DURATION_FRM) {
                    this.phase = StagePhase.GAME;
                }
                break;
            case StagePhase.GAME:
                this.doTick();
                break;
            case StagePhase.ENDED:
                this.nextScene(game);
                break;
            case StagePhase.GAME_OVER:
                game.scene = new GameOverScene(false);
                break;
        }
    }

    private doTick(): void {
        // remove ships
        this.ships = this.ships.filter(s => this.shipsToRemove.indexOf(s) === -1);
        this.shipsToRemove = [];

        // add ships
        this.ships.push(...this.shipsToAdd);
        this.shipsToAdd = [];

        // compute changes
        this.ships.forEach(ship => ship.tick());

        // detect collision
        for (let i = 0; i < this.ships.length; i++) {
            const ship1 = this.ships[i];
            for (let j = i + 1; j < this.ships.length; j++) {
                const ship2 = this.ships[j];

                // check if ship1 and ship2 are collided
                Collision.test(ship1, ship2);
            }
        }
    }

    protected abstract nextScene(game: Game): void;

    draw(ctx: CanvasRenderingContext2D): void {
        switch (this.phase) {
            case StagePhase.INTRO:
                this.drawIntro(ctx);
                break;
            case StagePhase.GAME:
                // draw canvas background
                ctx.drawImage(this.bgImg, 0, 0, Constant.CANVAS_WIDTH, Constant.CANVAS_HEIGHT);
                // draw ships
                this.ships.forEach(ship => ship.draw(ctx));
                break;
        }
    }

    protected drawIntro(ctx: CanvasRenderingContext2D): void {
        // background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, Constant.CANVAS_WIDTH, Constant.CANVAS_HEIGHT);

        // title
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '20px Future';
        ctx.fillText(this.stageName, Constant.GAME_CENTER_X, Constant.GAME_CENTER_Y);
    }

    onKeyDown(keyCode: number, game: Game): void {
        switch (keyCode) {
            case 80: // P button
                if (this.phase === StagePhase.GAME) {
                    game.scene = new PauseScene(this);
                }
                break;
            case 37: // left
                this.playerWrapper.moveLeft();
                break;
            case 39: // right
                this.playerWrapper.moveRight();
                break;
            case 32: // space
                this.playerWrapper.fire();
                break;
        }
    }

    onKeyUp(keyCode: number): void {
        if ((keyCode === 37 && this.playerWrapper.mover.deltaX < 0) || (keyCode === 39 && this.playerWrapper.mover.deltaX > 0)) {
            this.playerWrapper.stop();
        }
    }

    addShip(...ships: IShip[]) {
        ships.forEach(s => {
            s.attach(this);
            this.shipsToAdd.push(s);
        });
    }

    removeShip(...ships: IShip[]) {
        ships.forEach(s => {
            s.detach(this);
            this.shipsToRemove.push(s);
        });
    }

    update(event: GameEvent): void {
        if (event instanceof EventShipCreated) {
            this.addShip(event.ship);
        } else if (event instanceof EventShipDestroyed) {
            this.removeShip(event.observable);

            // game over
            if (event.observable === this.playerWrapper.player) {
                this.phase = StagePhase.GAME_OVER;
            }
        } else if (event instanceof EventPlayerUpgraded) {
            this.removeShip(this.playerWrapper.player);
            this.addShip(event.player);
            this.playerWrapper.player = event.player;
        }
    }
}