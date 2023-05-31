import * as crypto from "crypto";
import { Rooms } from "./Rooms";
import { User } from "./User";

export class Room {
  private _admin: User;
  private _users: User[];

  public get admin() {
    return this._admin;
  }

  public get users() {
    return this._users;
  }

  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(v: string) {
    this._id = v;
  }

  public handleLeave(user: User) {
    this._users.filter((u) => u !== user);
    if (this._users.length === 0) {
        const rooms = Rooms.getInstanse();
        return rooms.remove(this.id);
    }
    if (this.admin === user) {
      this._admin = this._users[0];
    }
  }

  public join(user: User) {
    this._users.push(user);
  }

  constructor(creator: User) {
    this._admin = creator;
    this._id = crypto.randomBytes(12).toString("base64");
    this._users = [];
  }
}
