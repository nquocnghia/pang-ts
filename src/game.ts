import { Constant } from './constant';
import { Point } from './point';
import { Player } from './ship/player';
import { IShip } from './ship/iship';
import { Util } from './util';
import { ShipFactory } from './ship/ship-factory';
import { AssetManager } from './asset-manager';

export class Game {
    private bgImg: HTMLImageElement;

    private player: Player;
    private ships: IShip[] = [];

    constructor() {
        // load background image
        this.bgImg = AssetManager.getInstance().getAsset('bg.jpg');

        // init player
        this.player = ShipFactory.makePlayer();
        this.ships.push(this.player);

        // init bouncing ships
        const enemy1 = ShipFactory.makeEnemy1(new Point(Constant.GAME_LEFT, Constant.GAME_TOP));
        const enemy2 = ShipFactory.makeEnemy2(new Point(Constant.GAME_LEFT, Constant.GAME_TOP));
        enemy2.top = enemy1.bottom;
        enemy2.right = Constant.GAME_RIGHT;
        this.ships.push(enemy1, enemy2);

        // init ships that move in a circular path
        const origin = new Point(Constant.GAME_CENTER_X, 250),
            radius = 100,
            deltaT = 0.05;
        this.ships.push(
            ShipFactory.makeEnemy3(origin, 0, 0, 0),
            ShipFactory.makeEnemy3(origin, radius, 0, deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(45), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(90), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(135), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(180), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(225), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(270), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(315), deltaT),
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