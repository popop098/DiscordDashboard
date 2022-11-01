import os
from bot import mybot
from quart import Quart, redirect, url_for,request,jsonify
from utils.weblogger import log_info
from dotenv import load_dotenv
load_dotenv(verbose=True)
app = Quart(__name__)

app.secret_key = b"super secret key"


@app.route("/user/")
async def user():
    user = request.args.get("id")
    userdata = await mybot.fetch_user(user)
    return jsonify({"user": userdata})
