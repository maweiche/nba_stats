from flask import Flask
from nba_api.stats.static import teams
app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/teams")
def get_teams():
    return teams.get_teams()