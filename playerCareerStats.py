import pandas as pd
from nba_api.stats.endpoints import playercareerstats

#Nikola Jokić
career = playercareerstats.PlayerCareerStats(player_id='203999')

#pandas data frames
pandas = career.get_data_frames()[0]

#json
json = career.get_json()

#dictionary
dict = career.get_dict()

print(pandas)