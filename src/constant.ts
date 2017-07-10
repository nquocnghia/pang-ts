/**
 * Static class for constants
 */
export class Constant {
    // window size
    static readonly PADDING = 10;
    static readonly GAME_WIDTH = 800;
    static readonly GAME_HEIGHT = 600;
    static readonly CANVAS_WIDTH = Constant.GAME_WIDTH + Constant.PADDING * 2;
    static readonly CANVAS_HEIGHT = Constant.GAME_HEIGHT + Constant.PADDING * 2;

    // for border detection
    static readonly GAME_LEFT = Constant.PADDING;
    static readonly GAME_TOP = Constant.PADDING;
    static readonly GAME_RIGHT = Constant.GAME_LEFT + Constant.GAME_WIDTH - 1; // -1 because it's 0-based indexed
    static readonly GAME_BOTTOM = Constant.GAME_TOP + Constant.GAME_HEIGHT - 1; // -1 because it's 0-based indexed
    static readonly GAME_CENTER_X = Constant.GAME_LEFT + Math.floor(Constant.GAME_WIDTH / 2);
    static readonly GAME_CENTER_Y = Constant.GAME_TOP + Math.floor(Constant.GAME_HEIGHT / 2);

    // frames per second
    static readonly FPS = 30;
}