export interface IShip {
    left: number;
    top: number;
    right: number;
    bottom: number;
    centerX: number;
    centerY: number;

    width: number;
    height: number;

    tick(): void;
    draw(ctx: CanvasRenderingContext2D): void;
}