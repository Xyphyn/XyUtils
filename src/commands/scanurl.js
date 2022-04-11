import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import fetch from 'node-fetch'

export const data = new SlashCommandBuilder().setName("scanurl").setDescription("Scans a url for certain things.")
.addSubcommand(option => option.setName("rickroll").setDescription("check for rickrolls").addStringOption(option => option.setName("url").setDescription("the url to check").setRequired(true)))

export const execute = async (interaction) => {
    if (interaction.options.getSubcommand() === 'rickroll') {
        const url = interaction.options.getString('url')
        const res = await fetch(url)

        const embed = new MessageEmbed()

        if (await (await res.text()).toLowerCase().includes('rick')) {
            embed.setTitle('Rickroll detected').setDescription('Rickroll has been detected. Proceed with caution.').setColor('#ff0000').setThumbnail(`https://img.youtube.com/vi/${url.split('/')[1]}/0.jpg`)
            interaction.reply({
                embeds: [ embed ]
            })
        } else {
            embed.setTitle('No rickroll detected').setDescription('No rickroll has been detected. This may be a false negative though.').setColor('#00ee00').setThumbnail(`https://img.youtube.com/vi/${url.split('/')[1]}/maxresdefault.jpg`)
            interaction.reply({
                embeds: [ embed ]
            })
        }
    }
}