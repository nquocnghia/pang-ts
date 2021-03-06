import { StageScene } from './stage-scene';
import { ShipFactory } from '../../ship/ship-factory';
import { Point } from '../../point';
import { Constant } from '../../constant';
import { Util } from '../../util';
import { Game } from '../../game';
import { IShip } from '../../ship/iship';
import { StagePhase } from './stage-phase';
import { ShipSide } from '../../ship/ship-side';
import { CircularGroup } from '../../ship/group/circular-group';
import { Shield } from '../../ship/item/shield';
import { EnemyCarryingItem } from '../../ship/decorator/enemy-carrying-item';
import { Stage2 } from './stage2';

export class Stage1 extends StageScene {
    constructor(player: IShip) {
        super('Stage 1', player, 2);

        // init bouncing groups
        const group1 = ShipFactory.makeBouncingGroup(5, 0);
        let y = Constant.GAME_TOP,
            x = Constant.GAME_LEFT,
            enemy;
        for (let i = 0; i < 5; i++) {
            enemy = ShipFactory.makeEnemy1(new Point(x, Constant.GAME_TOP));
            group1.addShip(enemy);
            x = enemy.right + 10;
        }
        y = enemy.bottom + 5;

        const group2 = ShipFactory.makeBouncingGroup(-5, 0);
        x = Constant.GAME_RIGHT;
        for (let i = 0; i < 5; i++) {
            enemy = ShipFactory.makeEnemy2(new Point(0, y));
            enemy.right = x;
            group2.addShip(enemy);
            x = enemy.left - 10;
        }

        this.addShip(group1, group2);

        // init ships that move in a circular path
        const origin = new Point(Constant.GAME_CENTER_X, 250),
            radius = 100,
            deltaT = 0.05,
            group3 = new CircularGroup(origin);
        group3.addShip(
            new EnemyCarryingItem(ShipFactory.makeEnemy3(origin, 0, 0, 0), new Shield()), // carries the shield item
            ShipFactory.makeEnemy3(origin, radius, 0, deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(45), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(90), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(135), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(180), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(225), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(270), deltaT),
            ShipFactory.makeEnemy3(origin, radius, Util.degToRad(315), deltaT),
        );

        this.addShip(group3);
    }

    protected nextScene(game: Game): void {
        game.scene = new Stage2(this.playerWrapper.player);
    }

    removeShip(...ships: IShip[]) {
        super.removeShip(...ships);

        // if all enemies are eleminated
        if (ships.filter(s => s.side === ShipSide.ENEMY).length === this.ships.filter(s => s.side === ShipSide.ENEMY).length) {
            this.phase = StagePhase.ENDED;
        }
    }
}