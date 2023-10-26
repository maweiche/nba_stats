"use client"
import { useState, useEffect } from 'react';

interface TeamLineup {
    id: number;
    name: string;
    position: string;
    height_feet: number;
    height_inches: number;
    weight_pounds: number;
}

export default function Lineup(teamId: any | null) {
    const [lineup, setLineup] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchLineup () {
        const team = teamId.teamId;
        console.log('fetching lineup', teamId.teamId)
        const response = await fetch(`/api/lineup/${team}`);
        const data = await response.json();
        console.log('data', data)
        setLineup(data);
        setLoading(false);
    }

    useEffect(() => {
        console.log('teamId', teamId);
        fetchLineup();
    }, []);

    return (
        <div>
            {loading && <div>Loading...</div>}
        </div>
    );
}