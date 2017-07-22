import { IScene } from './iscene';
import { Game } from '../game';
import { Constant } from '../constant';

export class PauseScene implements IScene {
    constructor(private currentScene: IScene) { }

    tick(game: Game): void { }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, Constant.CANVAS_WIDTH, Constant.CANVAS_HEIGHT);

        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '20px Future';
        ctx.fillText('PAUSED', Constant.GAME_CENTER_X, Constant.GAME_CENTER_Y);
    }

    onKeyUp(keyCode: number, game: Game): void { }

    onKeyDown(keyCode: number, game: Game): void {
        if (keyCode === 80) { // P
            game.scene = this.currentScene;
        }
    }
}