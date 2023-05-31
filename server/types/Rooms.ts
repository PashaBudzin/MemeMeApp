import { Room } from "./Room";

export class Rooms {
    private static _instanse : Rooms;
    private _rooms: Room[] = []
    private constructor () {  }
    static getInstanse(): Rooms {
        if (!this._instanse) {
            this._instanse = new Rooms();
        }
        return this._instanse;
    }
    
    public add(room: Room) {
        this._rooms.push(room);
    }
    public get(id: string) {
        return this._rooms.find(room => room.id === id);
    }
    public remove(id: string) {
        this._rooms = this._rooms.filter(room => room.id !== id);
    }
}


