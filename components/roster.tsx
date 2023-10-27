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

export default function Roster(teamId: any | null) {
    const [roster, setRoster] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchLineup () {
        const team = teamId.teamId;
        console.log('fetching lineup', teamId.teamId)
        const response = await fetch(`/api/roster/${team}`);
        const data = await response.json();
        console.log('data', data)
        setRoster(data.resultSets[0].rowSet);
        setLoading(false);
    }

    const rosterTableHeaders = [
        "TeamID",
        "SEASON",
        "LeagueID",
        "PLAYER",
        "NICKNAME",
        "PLAYER_SLUG",
        "NUM",
        "POSITION",
        "HEIGHT",
        "WEIGHT",
        "BIRTH_DATE",
        "AGE",
        "EXP",
        "SCHOOL",
        "PLAYER_ID",
        "HOW_ACQUIRED"
    ];

    const renderRosterTable = () => {
        return (
            <table>
                <thead>
                    <tr>
                        {rosterTableHeaders.map((header) => (
                            <th>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {roster.length > 0 && roster.map((row: any) => (
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


    useEffect(() => {
        console.log('teamId', teamId);
        fetchLineup();
    }, []);

    return (
        <div>
            {loading && <div>Loading...</div>}
            {!loading && renderRosterTable()}
        </div>
    );
}