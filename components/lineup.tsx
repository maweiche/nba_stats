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
        const response = await fetch(`/api/lineup/${teamId}`);
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
            <h1>Lineup</h1>
            {loading && <p>Loading...</p>}
            {!loading && (
            <ul>
                {lineup.map((lineup: TeamLineup) => (
                    <li key={lineup.id}>
                        {lineup.name} ({lineup.position}) | Height: {lineup.height_feet} feet {lineup.height_inches} inches | Weight: {lineup.weight_pounds} pounds
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}