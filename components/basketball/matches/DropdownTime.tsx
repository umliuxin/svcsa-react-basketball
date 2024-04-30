import React from 'react';

interface DropdownTimeProps {
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

const DropdownTime: React.FC<DropdownTimeProps> = ({
  selectedOption,
  onSelectOption,
}) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSelectOption(selectedOption);
  };

  return (
    <div className='match-dropdown'>
      <label htmlFor="timeframe">时间:</label>
      <select onChange={handleOptionChange} value={selectedOption}>
        <option value="all">All</option>
        <option value="week">Within 1 week</option>
        <option value="month">Within 1 month</option>
        <option value="3months">Within 3 months</option>

      </select>
    </div>
  );
};

export default DropdownTime;