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

export default function TeamList() {
    const [teams, setTeams] = useState([]);
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
            <h1>Teams</h1>
            {loading && <p>Loading...</p>}
            {!loading && (
            <ul>
                {teams.map((team: Team) => (
                    <li key={team.id}>
                        {team.full_name} ({team.abbreviation}) | Founded: {team.year_founded}
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}

