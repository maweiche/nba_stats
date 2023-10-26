from nba_api.stats.static import teams

# Get all teams.
nba_teams = teams.get_teams()

# Print the number of teams.
print("Number of teams fetched: {}".format(len(nba_teams)))

#Print the team display
# print(nba_teams)

#find a specific team
specific_team = [team for team in nba_teams if team["full_name"] == "Los Angeles Lakers"][0]

#Print the specific team
print(specific_team)
