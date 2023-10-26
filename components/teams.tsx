"use client"
import { useState, useEffect } from 'react';
import Lineup from './lineup';

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
            
            {loading && <p>Loading...</p>}
            
            <div>
            {!loading && !selectedTeam &&(
                <div>
                    <h1>Teams</h1>
                    <ul>
                        {teams.map((team: Team) => (
                            <li key={team.id}>
                                {team.full_name} ({team.abbreviation}) | Founded: {team.year_founded} | 
                                <button 
                                    onClick={() => {
                                        console.log('clicked', team.id.toString()),
                                        setSelectedTeam(team.id.toString())
                                    }}
                                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    View Lineup
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
             )}
            {selectedTeam && <Lineup teamId={selectedTeam.toString()} />}
          
            </div>
           
        </div>
    );
}

