import { IShip } from './iship';

export class Collision {
    static test(ship1: IShip, ship2: IShip): boolean {
        const collision = ship1.isCollidedWith(ship2);

        if (collision) {
            ship1.collisionHandler(ship2);
            ship2.collisionHandler(ship1);
        }

        return collision;
    }
}