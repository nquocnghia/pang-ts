import { StageScene } from './stage-scene';
import { Player } from '../../ship/player';
import { ShipFactory } from '../../ship/ship-factory';
import { Point } from '../../point';
import { Constant } from '../../constant';
import { Util } from '../../util';
import { Game } from '../../game';
import { GameOverScene } from '../game-over-scene';
import { IShip } from '../../ship/iship';
import { BouncingEnemy } from '../../ship/bouncing-enemy';
import { CircularEnemy } from '../../ship/circular-enemy';
import { StagePhase } from './stage-phase';

export class Stage1 extends StageScene {
    constructor(player: Player) {
        super('Stage 1', player, 2);

        // init bouncing ships
        const enemy1 = ShipFactory.makeEnemy1(new Point(Constant.GAME_LEFT, Constant.GAME_TOP));
        const enemy2 = ShipFactory.makeEnemy2(new Point(Constant.GAME_LEFT, Constant.GAME_TOP));
        enemy2.top = enemy1.bottom;
        enemy2.right = Constant.GAME_RIGHT;
        this.addShip(enemy1, enemy2);

        // init ships that move in a circular path
        const origin = new Point(Constant.GAME_CENTER_X, 250),
            radius = 100,
            deltaT = 0.05;
        this.addShip(
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

    protected nextScene(game: Game): void {
        game.scene = new GameOverScene(true);
    }

    removeShip(...ships: IShip[]) {
        super.removeShip(...ships);

        // if all enemies are eleminated
        if (ships.filter(s => s instanceof BouncingEnemy || s instanceof CircularEnemy).length ===
            this.ships.filter(s => s instanceof BouncingEnemy || s instanceof CircularEnemy).length) {
            this.phase = StagePhase.ENDED;
        }
    }
}