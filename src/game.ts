import { Constant } from './constant';
import { Point } from './point';
import { Player } from './ship/player';
import { IShip } from './ship/iship';
import { BouncingEnemy } from './ship/bouncing-enemy';
import { Util } from './util';
import { CircularEnemy } from './ship/circular-enemy';

export class Game {
    private bgImg: HTMLImageElement;

    private player: Player;
    private ships: IShip[] = [];

    constructor() {
        // load background image
        this.bgImg = new Image();
        this.bgImg.src = 'assets/bg.jpg';

        // init player
        this.player = new Player();
        this.ships.push(this.player);

        // init bouncing ships
        const enemy1 = new BouncingEnemy('assets/enemyBlack1.png', new Point(Constant.GAME_LEFT, Constant.GAME_TOP), 53, 48, 5, 0);
        const enemy2 = new BouncingEnemy('assets/enemyBlack2.png', new Point(Constant.GAME_LEFT, Constant.GAME_TOP), 64, 52, -5, 0);
        enemy2.top = enemy1.bottom;
        enemy2.right = Constant.GAME_RIGHT;
        this.ships.push(enemy1, enemy2);

        // init ships that move in a circular path
        const origin = new Point(Constant.GAME_CENTER_X, 250),
            radius = 100,
            deltaT = 0.05;
        this.ships.push(
            new CircularEnemy('assets/enemyBlack3.png', 59, 48, origin, 0, 0, 0),
            new CircularEnemy('assets/enemyBlack3.png', 59, 48, origin, radius, 0, deltaT),
            new CircularEnemy('assets/enemyBlack3.png', 59, 48, origin, radius, Util.degToRad(45), deltaT),
            new CircularEnemy('assets/enemyBlack3.png', 59, 48, origin, radius, Util.degToRad(90), deltaT),
            new CircularEnemy('assets/enemyBlack3.png', 59, 48, origin, radius, Util.degToRad(135), deltaT),
            new CircularEnemy('assets/enemyBlack3.png', 59, 48, origin, radius, Util.degToRad(180), deltaT),
            new CircularEnemy('assets/enemyBlack3.png', 59, 48, origin, radius, Util.degToRad(225), deltaT),
            new CircularEnemy('assets/enemyBlack3.png', 59, 48, origin, radius, Util.degToRad(270), deltaT),
            new CircularEnemy('assets/enemyBlack3.png', 59, 48, origin, radius, Util.degToRad(315), deltaT),
        );
    }

    tick(): void {
        this.ships.forEach(ship => ship.tick());
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // canvas background
        ctx.drawImage(
            this.bgImg,
            0,
            0,
            Constant.CANVAS_WIDTH,
            Constant.CANVAS_HEIGHT
        );

        this.ships.forEach(ship => ship.draw(ctx));
    }

    onKeyDown(keyCode: number): void {
        switch (keyCode) {
            case 37: // left
                this.player.moveLeft();
                break;
            case 39: // right
                this.player.moveRight();
                break;
        }

    }

    onKeyUp(keyCode: number): void {
        if ((keyCode === 37 && this.player.deltaX < 0) || (keyCode === 39 && this.player.deltaX > 0)) {
            this.player.stop();
        }
    }
}