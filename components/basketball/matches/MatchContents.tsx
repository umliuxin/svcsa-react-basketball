"use client"

import MatchList from "@/components/basketball/matches/MatchList";
import DropdownTime from "@/components/basketball/matches/DropdownTime";
import DropdownTeam from "@/components/basketball/matches/DropdownTeam";
import React, { useState } from 'react';


interface MatchContentsProps {
    matches: BbSeasonMatch[];
    teams: BbSeasonTeam[];
}


const MatchContents: React.FC<MatchContentsProps> = ({ matches, teams}) => {

    const [selectedTimeOption, setSelectedTimeOption] = useState('all');

    // Function to handle changes to the dropdown selection
    const handleSelectTimeOption = (option: string) => {
        setSelectedTimeOption(option);
    };

    const [selectedTeamOption, setSelectedTeamOption] = useState('all');

    // Function to handle changes to the dropdown selection
    const handleSelectTeamOption = (option: string) => {
        setSelectedTimeOption(option);
    };

    return (
        <section>
        {/* <h1>{season.name}</h1> */}
        {/* Render the SeasonDropdown component */}
            <div className="match-dropdown">
                <DropdownTime
                    selectedOption={selectedTimeOption}
                    onSelectOption={handleSelectTimeOption}
                />
                <DropdownTeam
                    selectedOption={selectedTeamOption}
                    onSelectOption={setSelectedTeamOption}
                    teams={teams}
                />
            </div>
            <MatchList matches={matches} timeOption={selectedTimeOption} teamOption={selectedTeamOption}/>
        </section>
    );
}

export default MatchContents