import "reflect-metadata"
import { createConnection } from "typeorm"
import { Player } from "./model/playerModel"

createConnection().then(async connection => {
    console.log("База данных загружается...")
    let _player = new Player()
    _player.uid = 1;
    _player.email = "test@mail.ru";
    _player.firstName = "Admin";
    _player.lastName = "Dev";
    _player.serverOwner = true;
    await connection.manager.save(_player)
    console.log("Player has been saved!")
})