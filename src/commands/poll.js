import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { polls, pollMeta } from "../managers/pollManager.js";

export const data = new SlashCommandBuilder().setName("poll").setDescription("Creates a poll.")
    .addStringOption(option => option.setName("question").setDescription("The question lol").setRequired(true))
    .addStringOption(option => option.setName("option1").setDescription("The first option lol").setRequired(true))
    .addStringOption(option => option.setName("option2").setDescription("The second option lol").setRequired(true))

export const execute = async (interaction) => {
    const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId("pollOption1")
            .setLabel(`${interaction.options.getString("option1")}`)
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId("pollOption2")
            .setLabel(`${interaction.options.getString("option2")}`)
            .setStyle('PRIMARY')
    )
    const embed = new MessageEmbed().setTitle(`${interaction.options.getString("question")}`).addField(interaction.options.getString("option1"), '0').addField(interaction.options.getString("option2"), '0').setColor('#0099ff')
    const message = await interaction.channel.send({
        embeds: [embed],
        components: [ row ]
    })
    interaction.reply({
        content: `Poll created!`,
        ephemeral: true
    })
    polls.set(message.id, new Map())
    pollMeta.set(message.id, {
        question: interaction.options.getString("question"),
        option1: interaction.options.getString("option1"),
        option2: interaction.options.getString("option2"),
        
    })
}

export const update = (message) => {
    let option1c = 0
    let option2c = 0
    const vals = polls.get(message.id).values()
    for (const val of vals) {
        if (val == 'option1') option1c++
        else if (val == 'option2') option2c++
        else console.error(`Unknown value ${val}`)
    }

    const id = message.id
    
    const embed = new MessageEmbed().setTitle(`${pollMeta.get(id).question}`)
    .addField(pollMeta.get(id).option1, option1c.toString())
    .addField(pollMeta.get(id).option2, option2c.toString()).setColor('#0099ff')

    message.edit({
        embeds: [embed]
    })
}