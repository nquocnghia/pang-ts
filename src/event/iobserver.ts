import { GameEvent } from './game-event';

export interface IObserver {
    update(event: GameEvent): void;
}

export interface IObservable {
    notify(event: GameEvent): void;
    attach(o: IObserver): void;
    detach(o: IObserver): void;
}

export class Observable implements IObservable {
    private observers: IObserver[] = [];

    notify(event: GameEvent): void {
        this.observers.forEach(o => o.update(event));
    }

    attach(o: IObserver): void {
        this.observers.push(o);
    }

    detach(o: IObserver): void {
        this.observers = this.observers.filter(obs => obs !== o);
    }
}