mp.discord.update(`Подключается...`, `Baby-Diablo-Loh.com.ru`);

mp.events.add("discordChange", () => {
    mp.discord.update(`Изучает новый мир govno-code.net`, `Baby-Diablo-Loh.com.ru`);
})

mp.events.add("discordOops", () => {
    mp.discord.update(`Ой, кажется он вышел за рамки дозволенного`, `Baby-Diablo-Loh.ru`)
})