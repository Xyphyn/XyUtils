import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import fetch from 'node-fetch'
import { memeMeta } from "../managers/memeManager.js";

export const data = new SlashCommandBuilder().setName("meme").setDescription("Returns posts from given subreddit.").addStringOption(option => option.setName('subreddit').setDescription('The subreddit to pull a post from.').setRequired(true))

export const execute = async (interaction) => {
    const embed = new MessageEmbed().setTitle("Getting posts...")
    .setDescription(`<a:loading:962043457101234206> Fetching a post from ${interaction.options.getString('subreddit')}... hold on...`).setColor('#0099ff')

    const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('prev-meme')
            .setLabel('Previous')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('next-meme')
            .setLabel('Next')
            .setStyle('PRIMARY')
    )

    await interaction.reply({
        embeds: [embed]
    })

    const subreddit = interaction.options.getString('subreddit')
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=100`

    const res = await (await fetch(url)).json()

    const description = res.data.children[4].data.selftext

    embed.setDescription(description).setTitle(res.data.children[4].data.title).setImage(res.data.children[4].data.url).setURL(res.data.children[4].data.url)

    const msg = await interaction.editReply({
        embeds: [ embed ],
        components: [ row ]
    }).then(msg => {
        memeMeta.set(msg.id, { subreddit: subreddit, index: 4 })
    })

    setTimeout((msg, memeMeta) => {
        msg.delete()
        memeMeta.delete(msg.id)
    }, 1000 * 60 * 60)
}

export const next = async (message) => {
    if (memeMeta.get(message.id).index >= 100) return;
    memeMeta.get(message.id).index++

    const embed = new MessageEmbed().setTitle("Getting posts...")
    .setDescription(`<a:loading:962043457101234206> Fetching a post from ${memeMeta.get(message.id).subreddit}... hold on...`).setColor('#0099ff')

    message.edit({
        embeds: [ embed ]
    })

    const subreddit = memeMeta.get(message.id).subreddit
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=100`

    const res = await (await fetch(url)).json()

    const description = res.data.children[memeMeta.get(message.id).index].data.selftext

    embed.setDescription(description).setTitle(res.data.children[memeMeta.get(message.id).index].data.title).setImage(res.data.children[memeMeta.get(message.id).index].data.url).setURL(res.data.children[memeMeta.get(message.id).index].data.url)

    message.edit({
        embeds: [ embed ]
    })
}

export const prev = async (message) => {
    if (memeMeta.get(message.id).index <= 4) return;
    memeMeta.get(message.id).index--

    const embed = new MessageEmbed().setTitle("Getting posts...")
    .setDescription(`<a:loading:962043457101234206> Fetching a post from ${memeMeta.get(message.id).subreddit}... hold on...`).setColor('#0099ff')

    message.edit({
        embeds: [ embed ]
    })

    const subreddit = memeMeta.get(message.id).subreddit
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=100`

    const res = await (await fetch(url)).json()

    const description = res.data.children[memeMeta.get(message.id).index].data.selftext

    embed.setDescription(description).setTitle(res.data.children[memeMeta.get(message.id).index].data.title).setImage(res.data.children[memeMeta.get(message.id).index].data.url).setURL(res.data.children[memeMeta.get(message.id).index].data.url)

    message.edit({
        embeds: [ embed ]
    })
} 