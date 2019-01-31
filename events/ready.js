module.exports = async (client) => {
    if (!client.args[0]) {
        console.info(client.strings.bot_ready);
        client.user.setActivity(client.strings.set_activity, {
            type: "WATCHING"
        });
    } else {
        console.info(client.strings.bot_down);
        await client.users.get(client.config.ownerID).send(client.args.join(" "));
        client.destroy();
    }
};