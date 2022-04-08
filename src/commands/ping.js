import { SlashCommandBuilder } from "@discordjs/builders"
import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js"

export const data = new SlashCommandBuilder().setName("ping").setDescription("Returns Discord API Ping")
export const execute = async (interaction, client) => {
    const embed = new MessageEmbed().setTitle("Discord latency")
    .setDescription(`<:wifi:962042152387477535> ${client.ws.ping}ms`).setColor('#0099ff')
    await interaction.reply({
        embeds: [embed]
    })
}