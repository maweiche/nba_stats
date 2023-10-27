from flask import Flask
from nba_api.stats.static import teams
from nba_api.stats.endpoints import teamdashlineups
from nba_api.stats.endpoints import leagueleaders
from nba_api.stats.endpoints import commonteamroster
from nba_api.stats.endpoints import scoreboard

app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/teams")
def get_teams():
    return teams.get_teams()

@app.route("/api/teams/<team_id>")
def get_team(team_id):
    return teams.find_team_name_by_id(team_id)

@app.route("/api/lineup/<team_id>")
def get_lineups(team_id):
    return teamdashlineups.TeamDashLineups(team_id=team_id, season="2023-24").get_json()

@app.route("/api/roster/<team_id>")
def get_roster(team_id):
    return commonteamroster.CommonTeamRoster(team_id=team_id, season="2023-24").get_json()

@app.route("/api/leagueleaders")
def get_leauge_leaders():
    return leagueleaders.LeagueLeaders(
        per_mode48='PerGame',
        season='2023-24',
        season_type_all_star='Regular Season',
        stat_category_abbreviation='PTS'
    ).get_json()

@app.route("/api/scoreboard")
def get_scoreboard():
    return scoreboard.Scoreboard().get_json()
    