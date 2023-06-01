import { useState } from "react";

const names = [
  'John',
  'Michael',
  'David',
  'James',
  'William',
  'Robert',
  'Daniel',
  'Joseph',
  'Matthew',
  'Thomas',
  'Emily',
  'Emma',
  'Olivia',
  'Sophia',
  'Ava',
  'Isabella',
  'Mia',
  'Charlotte',
  'Amelia',
  'Harper'
];

const Simulator = ({mantlemancerContract}) => {
  const [inputValue, setInputValue] = useState(0);
  const [simulationResult, setSimulationResult] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(parseInt(e.target.value));
  };

  const handleButtonClick = async () => {
    try {
      console.log(inputValue)
      const result = await mantlemancerContract.simulator(inputValue);
      
      console.log("Simulation result:", result);
      setSimulationResult(result);
    } catch (error) {
      console.error("Error calling simulator:", error);
    }
  };

  return (
    <div>
      <input type="number" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Simulate</button>

      {simulationResult.length > 0 && (
        <table>
          <thead>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Height</th>
            <th>Weight</th>
          </thead>
          <tbody>
            {simulationResult.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    {cellIndex === 0 ? names[cell-1] : 
                    cellIndex === 2 ? cell.toString() == 1 ? "male" : "female" : cell.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Simulator;