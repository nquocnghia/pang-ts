import { IObservable } from './iobserver';
import { IShip } from '../ship/iship';

export abstract class GameEvent {
    constructor(protected _observable: IObservable) { }

    get observable(): IObservable { return this._observable; }
    set observable(o: IObservable) { this._observable = o; }
}

export class EventShipCreated extends GameEvent {
    constructor(_observable: IShip, private _createdShip: IShip) {
        super(_observable);
    }

    get ship(): IShip { return this._createdShip; }
}

export class EventShipDestroyed extends GameEvent {
    constructor(_observable: IShip) {
        super(_observable);
    }

    get observable(): IShip { return this._observable as IShip; }
    set observable(o: IShip) { this._observable = o; }
}