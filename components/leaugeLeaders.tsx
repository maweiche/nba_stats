"use client"
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function LeagueLeaders() {
    const [showLeagueLeaders, setShowLeagueLeaders] = useState(false);
    const [leaderDataHeaders, setLeaderDataHeaders] = useState([]); 
    const [leaderData, setLeaderData] = useState([]);
    const [loading, setLoading] = useState(true);


    const renderTable = () => {
        // leaderData 
        console.log('headers', leaderDataHeaders)
        // headers
        // 0: "PLAYER_ID"
        // 1: "RANK"
        // 2: "PLAYER"
        // 3: "TEAM_ID"
        // 4:"TEAM"
        // 5: "GP"
        // 6: "MIN"
        // 7: "FGM"
        // 8: "FGA"
        // 9: "FG_PCT"
        // 10: "FG3M"
        // 11: "FG3A"
        // 12: "FG3_PCT"
        // 13: "FTM"
        // 14: "FTA"
        // 15: "FT_PCT"
        // 16: "OREB"
        // 17: "DREB"
        // 18: "REB"
        // 19: "AST"
        // 20: "STL"
        // 21:"BLK"
        // 22: "TOV"
        // 23:"PTS"
        // 24: "EFF"
        console.log('leaderData', leaderData)
    
        return (
            <table>
                <thead>
                    <tr>
                        {leaderDataHeaders.map((header) => (
                            <th>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* do not include player_id, team_id */}
                    {leaderData.length > 0 && leaderData.splice(0,10).map((row: any) => (
                        <tr>
                            {row.map((cell: any) => (
                                <td>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    async function fetchLeagueLeaders () {
        try{
            console.log('fetching league leaders')
            const response = await fetch('/api/leagueleaders');
            console.log('response', response )
            const data = await response.json();
            console.log('league leader data', data)
           
            setLeaderDataHeaders(data.resultSet.headers);
            setLeaderData(data.resultSet.rowSet);

        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        fetchLeagueLeaders();

        if(leaderData.length > 0){
            setLoading(false);
        }
    }, [
        leaderData.length
    ]);

    return (
        <div>
            <button
                onClick={() => setShowLeagueLeaders(!showLeagueLeaders)}
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    {!showLeagueLeaders ? 'League Leaders' : 'Hide League Leaders'}  {' '} 
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    View the top 10 players in each statistical category.
                </p>
            </button>
            {showLeagueLeaders && (
                <div>
                    
                    {loading && <p>Loading...</p>}
                    {!loading && (
                        renderTable()
                    )}
                </div>
            )}
        </div>
    );
}