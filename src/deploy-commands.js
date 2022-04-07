import { createSpinner } from 'nanospinner'
import chalk from 'chalk'

const spinner = createSpinner(chalk.yellow(`Deploying commands...`)).start()

import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import config from '../config.js'
import fs from 'fs'

const { clientId, token, guildId } = config

let commands = []

export default async function deploy() {
    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = await import(`./commands/${file}`)
        commands.push(command.data.toJSON())
    }

    const rest = new REST({ version: '9' }).setToken(token)
    
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => spinner.success({ text: chalk.green(`Commands deployed!`) }))
        .catch(error => spinner.error({ text: chalk.red(`${error}`) }))
}