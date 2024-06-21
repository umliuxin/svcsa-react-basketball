
import React from 'react';

interface DropdownTeamProps {
  selectedOption: string;
  onSelectOption: (option: string) => void;
  teams: BbSeasonTeam[];
}

const DropdownTeam: React.FC<DropdownTeamProps> = ({
  selectedOption,
  onSelectOption,
  teams
}) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSelectOption(selectedOption);
  };

  return (
    <div>
      <label htmlFor="teams">球队:</label>
      <select onChange={handleOptionChange} value={selectedOption}>
        <option value="all">All</option>
        {teams.map((team) => (
            <option key={team.teamid} value={team.teamid}>
            {team.team?.shortname}
            </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownTeam;