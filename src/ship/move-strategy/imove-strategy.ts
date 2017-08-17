import { IShip } from '../iship';

export interface IMoveStrategy {
    move(ship: IShip): void;
}