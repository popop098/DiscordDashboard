from bot import mybot
from quart import Quart,request,jsonify
from quart_cors import cors, route_cors
from dotenv import load_dotenv
import aiohttp
load_dotenv(verbose=True)
app = Quart(__name__)
Cors = cors(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def convert_iconurl(guild_id,icon):
    base_url = "https://cdn.discordapp.com"
    if icon == None:
        return f"/api/img?url={base_url}/embed/avatars/0.png"
    else:
        return f"/api/img?url={base_url}/icons/{guild_id}/{icon}.png"


@app.route("/dashboard/@me/guilds")
@route_cors()
async def dashboard_data():
    access_token = request.headers.get("Authorization")
    async with aiohttp.ClientSession() as session:
        async with session.get("https://discord.com/api/v9/users/@me/guilds",headers={'Authorization':f"Bearer {access_token}"}) as res:
            json_data = await res.json()
            bot_guild=[guild.id for guild in mybot.guilds]
            user_guild = []
            for i in json_data:
                if i['owner']:
                    if int(i['id']) in bot_guild:
                        user_guild.append({'name':i['name'],'id':i['id'],'icon':convert_iconurl(i['id'],i['icon']),'join':True})
                    else:
                        user_guild.append({'name':i['name'],'id':i['id'],'icon':convert_iconurl(i['id'],i['icon']),'join':False})
            return jsonify({"data":user_guild})
