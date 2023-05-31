export class User {
    
    private _name : string;
    private _score: number = 0;

    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
    }
    
    constructor(name: string, id: string) {
        this._name = name;
    }
}