"use client"
import { useState, useEffect } from 'react';
import Lineup from './lineup';
import Roster from './roster';

interface Team {
    id: number;
    abbreviation: string;
    city: string;
    full_name: string;
    nickname: string;
    state: string;
    year_founded: number;
}

export default function TeamList() {
    const [showTeams, setShowTeams] = useState<boolean>(false);
    const [teams, setTeams] = useState<Array<Team>>([]);
    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const [loading, setLoading] = useState(true);

    async function fetchTeams () {
        const response = await fetch('/api/teams');
        const data = await response.json();
        console.log('data', data)
        setTeams(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <div>
            <button
                onClick={() => setShowTeams(!showTeams)}
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >   
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    {!showTeams ? 'Teams' : 'Hide Teams'} {' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    View the NBA teams and click to see their lineups.
                </p>
            </button>
            {showTeams && (
                <div>
                    {loading && <p>Loading...</p>}
                    
                    <div>
                        {!loading && !selectedTeam &&(
                            <div>
                                <ul>
                                    {teams.map((team: Team) => (
                                        <li key={team.id}>
                                            <button 
                                                onClick={() => {
                                                    console.log('clicked', team.id.toString()),
                                                    setSelectedTeam(team.id.toString())
                                                }}
                                                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                            >
                                                {team.full_name} ({team.abbreviation}) | Founded: {team.year_founded}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {selectedTeam && (
                            <div>
                                <button 
                                    onClick={() => {
                                        setSelectedTeam('')
                                    }}
                                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                                >
                                    Back to Teams
                                </button>
                                <Roster teamId={selectedTeam.toString()} />
                            </div>
                        )}
                
                    </div>
                </div>
            )}
           
        </div>
    );
}

