import { createSpinner } from 'nanospinner'

const spinner = createSpinner(chalk.yellow(`Starting bot...`)).start()

import { Client, Collection, Intents, MessageEmbed } from 'discord.js'
import chalk from 'chalk'
import { config } from 'dotenv'
import fs from 'fs'

config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_PRESENCES] },)

client.commands = new Collection()
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = import(`./commands/${file}`).then(command => { client.commands.set(command.data.name, command) })
}

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = import(`./events/${file}`).then((event) => {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    });
}

client.once('ready', () => {
    spinner.success({ text: chalk.green(`Logged in as ${chalk.bold(client.user.username)}`) })
    import('./deploy-commands.js').then(deploy => deploy.default())
})

client.on('interactionCreate', async interaction => {
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
        const embed = new MessageEmbed().setColor('#ff0000').setTitle('Error running command').setDescription(error.message)
        
		await interaction.reply({ embeds: [ embed ] });
	}
});

spinner.update({ text: chalk.yellow('Logging in...') })
client.login(process.env.TOKEN).catch(error => { spinner.error({ text: chalk.red(`${error}`) }) })