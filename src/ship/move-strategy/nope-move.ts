import { IMoveStrategy } from './imove-strategy';
import { IShip } from '../iship';

export class NopeMove implements IMoveStrategy {
    move(ship: IShip): void { /* do nothing */ }
}