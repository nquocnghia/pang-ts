import { IScene } from './iscene';
import { Game } from '../game';
import { Constant } from '../constant';
import { MenuScene } from './menu-scene';

export class GameOverScene implements IScene {
    constructor(private isWon: boolean) { }

    tick(game: Game): void { }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, Constant.CANVAS_WIDTH, Constant.CANVAS_HEIGHT);

        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '20px Future';
        ctx.fillText(`You ${this.isWon ? 'won' : 'lost'}! Press any key to continue...`, Constant.GAME_CENTER_X, Constant.GAME_CENTER_Y);
    }

    onKeyUp(keyCode: number, game: Game): void { }

    onKeyDown(keyCode: number, game: Game): void {
        game.scene = new MenuScene();
    }
}