import { IScene } from './iscene';
import { Game } from '../game';
import { Constant } from '../constant';
import { Stage1 } from './stage/stage1';
import { ShipFactory } from '../ship/ship-factory';
import { AssetManager } from '../asset-manager';

export class MenuScene implements IScene {
    private readonly MENU_ITEMS = ['New Game', 'Load Game'];
    private readonly TITLE_Y = 130;
    private readonly BTN_WIDTH = 240;
    private readonly BTN_HEIGHT = 39;
    private readonly BTN_X = Constant.GAME_CENTER_X - this.BTN_WIDTH / 2;
    private readonly BTN_START_Y = 260;
    private readonly BTN_MARGIN_BOTTOM = 30;
    private readonly BTN_PADDING_LEFT = 10;
    private readonly CURSOR_WIDTH = 30;
    private readonly CURSOR_HEIGHT = 33;

    private am = AssetManager.getInstance();
    private btnImg = this.am.getAsset('buttonRed.png');
    private bgImg = this.am.getAsset('bg.jpg');
    private cursorImg = this.am.getAsset('cursor.png');

    private menuItems: MenuItem[] = [];
    private currentItem = 0;

    constructor() {
        // init menu items
        this.MENU_ITEMS.forEach((txt, idx) => {
            // y coordinate of the button
            const btnY = this.BTN_START_Y + (this.BTN_HEIGHT + this.BTN_MARGIN_BOTTOM) * idx;
            // push new item
            this.menuItems.push({
                text: txt,
                btnX: this.BTN_X,
                btnY: btnY,
                btnCenterX: this.BTN_X + this.BTN_WIDTH / 2,
                btnCenterY: btnY + this.BTN_HEIGHT / 2,
                cursorX: this.BTN_X + this.BTN_PADDING_LEFT,
                cursorY: btnY + this.BTN_HEIGHT / 2 - this.CURSOR_HEIGHT / 2,
            });
        });
    }

    tick(game: Game): void { }

    draw(ctx: CanvasRenderingContext2D): void {
        // background image
        ctx.drawImage(this.bgImg, 0, 0, Constant.CANVAS_WIDTH, Constant.CANVAS_HEIGHT);

        // title
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 3;
        ctx.font = 'bold 150px Future';
        ctx.strokeText('[ PANG ]', Constant.GAME_CENTER_X, this.TITLE_Y);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 110px Future';
        ctx.fillText('[ PANG ]', Constant.GAME_CENTER_X, this.TITLE_Y);

        // menu items
        this.menuItems.forEach((item, idx) => {
            // button image
            ctx.drawImage(this.btnImg, item.btnX, item.btnY, this.BTN_WIDTH, this.BTN_HEIGHT);

            // if current item is selected
            if (idx === this.currentItem) {
                ctx.drawImage(this.cursorImg, item.cursorX, item.cursorY, this.CURSOR_WIDTH, this.CURSOR_HEIGHT);
                ctx.fillStyle = '#333333';
            } else {
                ctx.fillStyle = '#aaaaaa';
            }

            // text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 20px Future';
            ctx.fillText(item.text, item.btnCenterX, item.btnCenterY);

        });

        // credit
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = '#fff';
        ctx.font = '15px Future';
        ctx.fillText('Developed by foly', Constant.GAME_CENTER_X, Constant.GAME_BOTTOM);
    }

    onKeyUp(keyCode: number, game: Game): void { }

    onKeyDown(keyCode: number, game: Game): void {
        switch (keyCode) {
            case 38: // up
                this.currentItem -= this.currentItem === 0 ? 0 : 1;
                break;
            case 40: // down
                this.currentItem += this.currentItem === this.menuItems.length - 1 ? 0 : 1;
                break;
            case 32: // space
                if (this.currentItem === 0) { // new game
                    game.scene = new Stage1(ShipFactory.makePlayer());
                }
                break;
        }
    }
}

/**
 * Data class for a menu item
 */
interface MenuItem {
    text: string;
    btnX: number;
    btnY: number;
    btnCenterX: number;
    btnCenterY: number;
    cursorX: number;
    cursorY: number;
}