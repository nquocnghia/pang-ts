import { IScene } from './iscene';
import { Game } from '../game';
import { AssetManager } from '../asset-manager';
import { Constant } from '../constant';
import { MenuScene } from './menu-scene';

export class LoadingScene implements IScene {
    private assetManager: AssetManager = AssetManager.getInstance();

    // configurable parameters
    private readonly BAR_PADDING = 10;
    private readonly BAR_WIDTH = Constant.GAME_WIDTH / 2;
    private readonly BAR_HEIGHT = 50;

    // computed values
    private readonly BAR_X = Constant.GAME_CENTER_X - this.BAR_WIDTH / 2;
    private readonly BAR_Y = Constant.GAME_CENTER_Y - this.BAR_HEIGHT / 2;
    private readonly OUTER_BAR_X = this.BAR_X - this.BAR_PADDING;
    private readonly OUTER_BAR_Y = this.BAR_Y - this.BAR_PADDING;
    private readonly OUTER_BAR_WIDTH = this.BAR_WIDTH + this.BAR_PADDING * 2;
    private readonly OUTER_BAR_HEIGHT = this.BAR_HEIGHT + this.BAR_PADDING * 2;

    constructor() {
        this.assetManager.preload();
    }

    tick(game: Game): void {
        if (this.assetManager.isPreloadingDone()) {
            game.scene = new MenuScene();
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const progress = this.assetManager.getPreloadingProgress();

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, Constant.CANVAS_WIDTH, Constant.CANVAS_HEIGHT);

        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.OUTER_BAR_X, this.OUTER_BAR_Y, this.OUTER_BAR_WIDTH, this.OUTER_BAR_HEIGHT);

        ctx.fillStyle = 'red';
        ctx.fillRect(this.BAR_X, this.BAR_Y, this.BAR_WIDTH * progress, this.BAR_HEIGHT);

        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '20px Future';
        ctx.fillText(`${Math.floor(progress * 100)}%`, Constant.GAME_CENTER_X, Constant.GAME_CENTER_Y);
    }

    onKeyUp(keyCode: number, game: Game): void { }

    onKeyDown(keyCode: number, game: Game): void { }
}