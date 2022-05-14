import { SlashCommandBuilder } from "@discordjs/builders";
import { TextInputComponent } from "discord.js";
import { MessageActionRow } from "discord.js";
import { Modal } from "discord.js";

export const data = new SlashCommandBuilder().setName("modal-test").setDescription("modal test")

export const execute = async (interaction) => {

    const modal = new Modal({
        title: "Modal Test",
        customId: "modal-test",
        components: [
            new MessageActionRow().addComponents(new TextInputComponent().setCustomId("modal-test@test-input").setLabel('you are garbo').setStyle("SHORT")),
            new MessageActionRow().addComponents(new TextInputComponent().setCustomId("modal-test@test-input2").setLabel('amogus').setStyle("PARAGRAPH"))
        ]
    })

    await interaction.showModal(modal)
}