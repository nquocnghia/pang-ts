import { StageScene } from './stage-scene';
import { Game } from '../../game';
import { IShip } from '../../ship/iship';
import { GameOverScene } from '../game-over-scene';
import { ShipFactory } from '../../ship/ship-factory';
import { Constant } from '../../constant';
import { StagePhase } from './stage-phase';
import { Boss } from '../../ship/boss';

export class Stage2 extends StageScene {
    private readonly BAR_WIDTH = 200;
    private readonly BAR_HEIGHT = 30;
    private readonly BAR_PADDING = 5;
    private readonly BAR_X = Constant.GAME_RIGHT - this.BAR_WIDTH;
    private readonly BAR_Y = Constant.GAME_TOP;

    private readonly BAR_INNER_WIDTH = this.BAR_WIDTH - this.BAR_PADDING * 2;
    private readonly BAR_INNER_HEIGHT = this.BAR_HEIGHT - this.BAR_PADDING * 2;
    private readonly BAR_INNER_X = this.BAR_X + this.BAR_PADDING;
    private readonly BAR_INNER_Y = this.BAR_Y + this.BAR_PADDING;

    private boss: Boss;

    constructor(player: IShip) {
        super('Meet the BOSS!', player, 2);

        this.boss = ShipFactory.makeBoss();
        this.addShip(this.boss);
    }

    protected nextScene(game: Game): void {
        game.scene = new GameOverScene(true);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);

        if (this.phase === StagePhase.GAME) {
            ctx.strokeStyle = '#000000';
            ctx.strokeRect(this.BAR_X, this.BAR_Y, this.BAR_WIDTH, this.BAR_HEIGHT);

            const width = this.BAR_INNER_WIDTH * (this.boss.hp / this.boss.MAX_HP);
            ctx.fillStyle = 'red';
            ctx.fillRect(this.BAR_INNER_X, this.BAR_INNER_Y, width, this.BAR_INNER_HEIGHT);
        }
    }

    removeShip(...ships: IShip[]) {
        super.removeShip(...ships);

        // if all enemies are eleminated
        if (ships.indexOf(this.boss) !== -1) {
            this.phase = StagePhase.ENDED;
        }
    }
}