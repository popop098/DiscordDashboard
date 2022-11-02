import os
from bot import mybot
from web import app
from utils.logger import log_info
from dotenv import load_dotenv
load_dotenv(verbose=True)

def run():
    log_info("Create Web server task...")
    mybot.loop.create_task(app.run_task(host=os.getenv("HOST"),port=os.getenv("PORT")))
    log_info("Start bot...")
    mybot.run(os.getenv("BOT_TOKEN"))
    log_info("Successfully started Web server and Bot!")
if __name__ == "__main__":
    run()