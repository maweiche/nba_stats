"use client"
import { useState, useEffect } from 'react';

export default function LeagueLeaders() {
    const [leaderData, setLeaderData] = useState([]);

    async function fetchLeagueLeaders () {
        try{
            console.log('fetching league leaders')
            const response = await fetch('/api/leagueleaders');
            console.log('response', response )
            const data = await response.json();
            console.log('league leader data', data)
            setLeaderData(data);
        } catch (error) {
            console.log('error', error)
        }
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