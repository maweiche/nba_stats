"use client"
import { useState, useEffect } from 'react';

export default function LeagueLeaders() {
    const [leaderData, setLeaderData] = useState([]);

    async function fetchLeagueLeaders () {
        console.log('fetching league leaders')
        const response = await fetch('/api/league_leaders');
        const data = await response.json();
        console.log('league leader data', data)
        setLeaderData(data);
    }

    useEffect(() => {
        fetchLeagueLeaders();
    }, []);

    return (
        <div>
            <h1>League Leaders</h1>
        </div>
    );
}