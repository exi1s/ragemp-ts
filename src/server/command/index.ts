// import { User } from "@/db/src/entity/User";
// import { createConnection } from "typeorm";

mp.events.addCommand({
  pos: (player, _: any): void => {
    let p = player.position;
    let r = player.heading;
    console.log(`${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)} | * Head: ${r.toFixed(4)}`);
  },

  // reg: async (player, name: string) => {
  //   if (name === null || name === undefined) return
  //   if (player) {
  //     createConnection().then(async connection_ => {
        
  //       const player_ = new User()
  //       player_.name = name
  //       await connection_.manager.save(player_)
  //     }).catch(error => console.log(error))
  //   }
  // }
})