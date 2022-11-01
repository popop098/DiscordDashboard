def AutoCogs(self):
    os = __import__("os")
    cog_list = os.listdir("cogs/")
    cog_list = [cog for cog in cog_list if cog.endswith(".py")]
    for i in cog_list:
        cog_name = "cogs." + i.replace(".py", "")
        self.load_extension(cog_name)
    self.load_extension("jishaku")


def AutoCogsReload(self):
    os = __import__("os")
    cog_list = os.listdir("cogs/")
    cog_list = [cog for cog in cog_list if cog.endswith(".py")]
    for i in cog_list:
        cog_name = "cogs." + i.replace(".py", "")
        self.reload_extension(cog_name)
    self.reload_extension("jishaku")