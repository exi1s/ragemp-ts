const discordShape: ColshapeMp = mp.colshapes.newRectangle(-17.46, 4.58, 3, 3, 0);

function playerEnterShapeDiscord(player: PlayerMp, shape: ColshapeMp) {
    if (shape !== discordShape) {
        player.call("discordChange")
    }
}

mp.events.add("playerEnterColshape", playerEnterShapeDiscord)

function playerExitShapeDiscord(player: PlayerMp, shape: ColshapeMp) {
    if (shape === discordShape) {
        player.call("discordOops")
    }
}

mp.events.add("playerExitColshape", playerExitShapeDiscord)
