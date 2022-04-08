import { SlashCommandBuilder } from "@discordjs/builders"
import { MessageEmbed } from "discord.js"
import fetch from 'node-fetch'

export const data = new SlashCommandBuilder().setName("cat").setDescription("Returns an image of a cat").addBooleanOption(option => option.setName('animated').setDescription('Whether or not to return an animated cat').setRequired(false))

export const execute = async (interaction) => {
    const embed = new MessageEmbed().setTitle("Getting cat...")
    .setDescription(`<a:loading:962043457101234206> Fetching a cat... hold on...`).setColor('#0099ff')

    await interaction.reply({
        embeds: [embed]
    })

    const animated = interaction.options.getBoolean('animated')
    const url = animated ? 'https://cataas.com/cat/gif?json=true' : 'https://cataas.com/cat?json=true'

    const res = await (await fetch(url)).json()

    embed.setDescription("").setTitle('Kitty :cat:').setImage(`https://cataas.com${res.url}`)

    await interaction.editReply({
        embeds: [ embed ]
    })
}