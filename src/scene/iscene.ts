import { Game } from '../game';

export interface IScene {
    tick(game: Game): void;
    draw(ctx: CanvasRenderingContext2D): void;
    onKeyUp(keyCode: number, game: Game): void;
    onKeyDown(keyCode: number, game: Game): void;
}