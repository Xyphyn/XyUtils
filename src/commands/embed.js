import { SlashCommandBuilder } from "@discordjs/builders"
import { Modal } from "discord.js"
import { TextInputComponent } from "discord.js"
import { MessageActionRow } from "discord.js"

export const data = new SlashCommandBuilder().setName("embed").setDescription("Creates an embed (Opens in a modal)")
export const execute = async (interaction, client) => {
    const modal = new Modal({
        title: "Embed Creator",
        customId: "embed-modal",
        components: [
            new MessageActionRow().addComponents(new TextInputComponent().setCustomId("embed-modal@title").setLabel('Title').setStyle("SHORT")),
            new MessageActionRow().addComponents(new TextInputComponent().setCustomId("embed-modal@description").setLabel('Description').setStyle("PARAGRAPH")),
            new MessageActionRow().addComponents(new TextInputComponent().setCustomId("embed-modal@color").setLabel('Color (hex)').setStyle("SHORT"))
        ]
    })

    await interaction.showModal(modal)
}