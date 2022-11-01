import discord
from discord.ext import commands
from utils.cogtool import AutoCogs
from utils.botlogger import log_info
class Bot(commands.Bot):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.remove_command("help")
        # AutoCogs(self)

    async def on_ready(self):
        print(f"Logged in as {self.user}")
        log_info(f"Logged in as {self.user}")

    async def on_message(self, message):
        if message.author == self.user or message.author.bot:
            return

        await self.process_commands(message)


intents = discord.Intents.default()
intents.members = True
mybot = Bot(command_prefix=commands.when_mentioned, intents=intents)
