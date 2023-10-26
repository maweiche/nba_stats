from flask import Flask
from nba_api.stats.static import teams
from nba_api.stats.endpoints import teamdashlineups
from nba_api.stats.endpoints import leagueleaders

app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/teams")
def get_teams():
    return teams.get_teams()

@app.route("/api/lineup/<team_id>")
def get_lineups(team_id):
    return teamdashlineups.TeamDashLineups(team_id=team_id, season="2023-24").get_json()

@app.route("/api/leauge_leaders")
def get_leauge_leaders():
    top_500 = leagueleaders.LeagueLeaders(
        per_mode_simple='PerGame',
        season='2023-24',
        season_type_all_star='Regular Season',
        stat_category_abbreviation='PTS'
    ).get_json()[:500]
    # top_500_avg = top_500.groupby(['player_name', 'player_id']).mean()[[
    #     'min', 'fgm', 'fga', 'ftm', 'fta', 'pts', 'fg3m', 'fg3a', 'gp'
    # ]]
    return top_500