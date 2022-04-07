import { update } from "../commands/poll.js";
import { polls } from "../pollManager.js";

export const name = "interactionCreate"
export const once = false
export const execute = async (interaction) => {
    // if the interaction is a message component interaction, reply with the message component
    if (!interaction.isButton()) return;
    switch (interaction.customId) {
        case "test":
            await interaction.reply({
                content: `ur sus tbh`,
                components: []
            })
            break;
        case "pollOption1":
            const poll1 = polls.get(interaction.message.id)
            if (!poll1) break;
            poll1.set(interaction.user.id, 'option1')
            interaction.deferUpdate()
            update(interaction.message)
            break;
        case "pollOption2":
            const poll2 = polls.get(interaction.message.id)
            if (!poll2) break;
            poll2.set(interaction.user.id, 'option2')
            update(interaction.message)
            interaction.deferUpdate()
            break;
    }
}