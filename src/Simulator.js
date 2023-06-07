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

const hair = [
  'black',
  'brown',
  'blonde',
  'gray',
  'white',
  'bald'
]

const eye = [
  'blue',
  'black',
  'brown',
  'green'
]

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
    <div className="table-container">
      <div class="form-row input-container-name">
        <input type="number" value={inputValue} onChange={handleInputChange} className="input-design"/>
      </div>
      <div class="form-row input-container-name">
        <button type="submit" className="submit-button black-button" onClick={handleButtonClick}>Genesis Architect</button>
      </div>

      {simulationResult.length > 0 && (
        <table class="custom-table">
          <thead>
            <th className="column-15">Name</th>
            <th className="column-10">Age</th>
            <th className="column-15">Gender</th>
            <th className="column-10">Height</th>
            <th className="column-10">Weight</th>
            <th className="column-10">Hair color</th>
            <th className="column-10">Eye color</th>
          </thead>
          <tbody>
            {simulationResult.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    {cellIndex === 0 ? names[cell-1] : 
                    cellIndex === 2 ? cell.toString() == 1 ? "male" : "female" : 
                    cellIndex === 5 ? hair[cell-1] :
                    cellIndex === 6 ? eye[cell-1] : cell.toString()}
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