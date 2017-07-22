import { IScene } from './scene/iscene';
import { LoadingScene } from './scene/loading-scene';

export class Game {
    scene: IScene;

    constructor() {
        this.scene = new LoadingScene();
    }

    tick(): void {
        this.scene.tick(this);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.scene.draw(ctx);
    }

    onKeyDown(keyCode: number): void {
        this.scene.onKeyDown(keyCode, this);
    }

    onKeyUp(keyCode: number): void {
        this.scene.onKeyUp(keyCode, this);
    }
}