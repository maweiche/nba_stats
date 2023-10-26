from nba_api.stats.static import players

# get_players returns a list of dictionaries, each representing a player.
nba_players = players.get_players()

#Print the number of players.
print("Number of players fetched: {}".format(len(nba_players)))

#Print the first 5 players.
# print(nba_players[:5])

# find a specific player
specific_player = [player for player in nba_players if player["full_name"] == "LeBron James"][0]

#Print the specific player
print(specific_player)