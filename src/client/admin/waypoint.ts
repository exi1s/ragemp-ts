class TeleportWaypoint {
    constructor() {
        mp.events.add("teleportWaypointBind", () => this._Init()) // for commands
        mp.keys.bind(0x77, true, () => this._Init())
    }

    private _Init(): void {
        let coords: Vector3 | null | any = this.getWaypoint()
        if (!coords) return mp.gui.chat.push("!{red}Нет активной точки на карте")
        if (coords !== null) {
            this.getZ(coords.x, coords.y, 0, function (z: any): void | any {
                if (!mp.players.local.vehicle) {
                    mp.players.local.setCoordsNoOffset(coords.x, coords.y, z, false, false, false)
                } else {
                    mp.players.local.vehicle.setCoordsNoOffset(coords.x, coords.y, z, false, false, false)
                }
            })
        }
    }

    private getWaypoint(): void {
        if (mp.game.invoke(RageEnums.Natives.HUD.IS_WAYPOINT_ACTIVE)) {
            /**
             * Если разместить эти переменные в public | до constructor | работать они не будут
             * В качестве переменных все прекрасно работает
             */
            let blip_int: number | any = mp.game.invoke(RageEnums.Natives.HUD.GET_WAYPOINT_BLIP_ENUM_ID)
            let blip_fnd: number | any = mp.game.invoke(RageEnums.Natives.HUD.GET_NUMBER_OF_ACTIVE_BLIPS)
            let info_id: number | any = mp.game.invoke(RageEnums.Natives.HUD.GET_FIRST_BLIP_INFO_ID, blip_int)
            let info_id_next: number | any = mp.game.invoke(RageEnums.Natives.HUD.GET_NEXT_BLIP_INFO_ID, blip_int)

            for (let i: any = info_id, blipCount: any = 0; blipCount != blip_fnd; blipCount++, i = info_id_next) {
                if (mp.game.invoke(RageEnums.Natives.HUD.GET_BLIP_SPRITE)) {
                    let coord: any = mp.game.ui.getBlipInfoIdCoord(i)
                    return coord!
                }
            }
        }

        return null!
    }

    public getZ(x: number | any, y: number | any, z: number | any, fnd: any): void {
        let _z: number | any = 0.0
        let int_c: number | any = 0
        let _check_z: number | any
        let globalInt = setInterval(() => {
            int_c++
            mp.game.streaming.setFocusArea(x, y, 1000, 0.0, 0.0, 0.0)
            if (z === 0) {
                for (let i: any = 800; i >= 0; i -= 20) {
                    _check_z = i + 0.1
                    mp.game.streaming.requestAdditionalCollisionAtCoord(x, y, _check_z)
                    if (int_c >= 50) mp.players.local.setCoordsNoOffset(x, y, _check_z, false, false, false)
                    _z = mp.game.gameplay.getGroundZFor3DCoord(x, y, _check_z, false, false)
                    if (_z !== 0.0) {
                        mp.game.invoke(RageEnums.Natives.STREAMING.SET_FOCUS_ENTITY, mp.players.local.handle)
                        fnd(_z + 0.1)
                        clearInterval(globalInt)
                        return
                    }
                }
            } else {
                _z = mp.game.gameplay.getGroundZFor3DCoord(x, y, _check_z, false, false)
                mp.game.invoke(RageEnums.Natives.STREAMING.SET_FOCUS_ENTITY, mp.players.local.handle)
                fnd(_z + 0.1)
                clearInterval(globalInt)
                return
            }

            if (int_c >= 100) {
                if (int_c >= 50) mp.players.local.setCoordsNoOffset(x, y, 10.0, false, false, false)
                mp.game.invoke(RageEnums.Natives.STREAMING.SET_FOCUS_ENTITY, mp.players.local.handle)
                clearInterval(globalInt)
                return
            }
        }, 1)
    }
}

new TeleportWaypoint()