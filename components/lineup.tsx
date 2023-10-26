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
        console.log('fetching lineup')
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
            {loading && <div>Loading...</div>}
        </div>
    );
}