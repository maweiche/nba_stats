"use client"
import { useState, useEffect } from 'react';

interface Team {
    id: number;
    abbreviation: string;
    city: string;
    full_name: string;
    nickname: string;
    state: string;
    year_founded: number;
}

export default function Scoreboard() {
    const [showScoreboard, setShowScoreboard] = useState<boolean>(false);
    const [scoreboardData, setScoreboardData] = useState<Array<Team>>([]);
    const [scoreboardDeciphered, setScoreboardDeciphered] = useState<Array<Team>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function fetchScoreboard () {
        const response = await fetch('/api/scoreboard');
        const data = await response.json();
        console.log('data', data.resultSets[0])
        setScoreboardData(data.resultSets[0].rowSet);
        setLoading(false)
    }

    async function fetchTeamName (teamId: number) {
        const response = await fetch(`/api/teams/${teamId}`);
        const data = await response.json();
        console.log('data', data)
        return data;
    }

    const scoreboardHeaders = [
        "Game Time",
        "Home Team",
        "Away Team",
    ];

    const renderScoreboard = () => {
        // display a table of games, with the following columns:
        // Game Time, Home Team, Away Team
        // the data is game[4], game[6], game[7
        // game[4] is the game time
        // game[6] is the home team id
        // game[7] is the away team id

        // find the team name by the id 
        const scoreboardDeciphered = scoreboardData.map((game: any) => {
            return {
                gameTime: game[4],
                homeTeam: fetchTeamName(game[6]),
                awayTeam: fetchTeamName(game[7])
            }
        })
        return(
            <table className="table-auto">
                <thead>
                    <tr>
                        {scoreboardHeaders.map((header: string) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {scoreboardDeciphered.map((game: any) => (
                        <tr key={game.gameTime}>
                            <td>{game.gameTime}</td>
                            <td>{game.homeTeam}</td>
                            <td>{game.awayTeam}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    useEffect(() => {
        if(showScoreboard){
            fetchScoreboard();
        }
        if(scoreboardData && scoreboardDeciphered.length != scoreboardData.length){
            
        }
    }, [showScoreboard, scoreboardData, scoreboardDeciphered]);

    return (
        <div>
            <button
                onClick={() => setShowScoreboard(!showScoreboard)}
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >   
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    {!showScoreboard ? 'Scoreboard' : 'Hide Scoreboard'} {' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    View today's NBA games and scores.
                </p>
            </button>
            {showScoreboard && (
                <div>
                    {loading && <p>Loading...</p>}
                    
                    <div>
                        {!loading && (
                            renderScoreboard()
                        )}
                
                    </div>
                </div>
            )}
           
        </div>
    );
}

