import { MessageEmbed } from "discord.js"

export const name = "interactionCreate"
export const once = false
export const execute = async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    switch (interaction.customId) {
        case "modal-test": {
            const input = interaction.fields.getTextInputValue("modal-test@test-input")
            const input2 = interaction.fields.getTextInputValue("modal-test@test-input2")
            const embed = new MessageEmbed().setTitle("Modal Test").setDescription(`Input1: ${input}\nInput2: ${input2}`).setColor('#0099ff')

            await interaction.reply({
                embeds: [embed]
            })
            break
        }

        case "embed-modal": {
            try {
                const embedTitle = interaction.fields.getTextInputValue("embed-modal@title")
                const embedDescription = interaction.fields.getTextInputValue("embed-modal@description")
                let embedColor = interaction.fields.getTextInputValue("embed-modal@color") ?? "#000000"
                if (embedColor.length <= 0) embedColor = "#000000"
                const embed = new MessageEmbed().setTitle(embedTitle).setDescription(embedDescription).setColor(embedColor)

                await interaction.reply({
                    embeds: [embed]
                })
            } catch (e) {
                if (e instanceof TypeError) {
                    await interaction.reply({
                        embeds: [new MessageEmbed().setTitle("Error").setDescription("<:criticalerror:940319019901263913> Invalid color").setColor('#ff0000')]
                    })
                }
            }


            break
        }
        
        default:
            await interaction.reply({
                embeds: [new MessageEmbed().setTitle("Modal Test").setDescription(`No modal found of id ${interaction.customId}`).setColor('#0099ff')]
            })
            break
    }
}