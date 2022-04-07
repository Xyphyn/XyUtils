import { SlashCommandBuilder } from "@discordjs/builders"
import { MessageActionRow, MessageButton } from "discord.js"

export const data = new SlashCommandBuilder().setName("ping").setDescription("Replies with pong!")
    .addStringOption(option => option.setName("text").setDescription("text to echo back.").setRequired(true))
export const execute = async (interaction) => {
    const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId("test")
            .setLabel("sussi baka")
            .setStyle('DANGER')
    )
    await interaction.reply({
        content: `pong! ${interaction.options.getString("text")}`,
        components: [ row ]
    })
}