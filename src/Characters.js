import { useState } from "react";

const Characters = ({mantlemancerContract}) => {
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const [multiplier1, setMultiplier1] = useState("");
  const [multiplier2, setMultiplier2] = useState("");
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(0);
  const [maxSum, setMaxSum] = useState(0);
  const [divs, setDivs] = useState("");
  const [apiOn, setApiOn] = useState(false);
  const [verifyOn, setVerifyOn] = useState(false);
  const [hexUsed, setHexUsed] = useState('');

  const handleApiToggle = () => {
    setApiOn(!apiOn);
    setVerifyOn(false);
  }

  const handleVerifyToggle = () => {
    setVerifyOn(!verifyOn);
    setApiOn(false);
  };

  const generateNumbers = async () => {
    const lineCountMultiplier1 = multiplier1.split("\n").length;
    const lineCountMultiplier2 = multiplier2.split("\n").length;
    try {
      const result = await mantlemancerContract.generateNumbers(lineCountMultiplier1, lineCountMultiplier2, rangeMin, rangeMax, maxSum);
      setGeneratedNumbers(result[0]);
      setHexUsed(result[1]._hex);

      const multiplier1Lines = multiplier1.split("\n");
      const multiplier2Lines = multiplier2.split("\n");
      const divs = multiplier1Lines.map((line, index) => {
        const divs2 = multiplier2Lines.map((trait, tindex) => (
          <div key={tindex} class="traits-container">
            <div className="result-title smaller-text">{trait}</div>
            <div className="trait-values result-title smaller-text">{result[0][index * multiplier2Lines.length + tindex].toString()}</div>
          </div>
        ));

        return (
          <div key={index} className="result-div item-result char-result">
            <div className="heroes-values">
              <div className="result-style">
                <p className="result-title small-text"><b>{line}</b></p>
                {divs2}
              </div>
            </div>
          </div>
        );
      });
      setDivs(divs);
    } catch (error) {
      console.error("Error generating numbers:", error);
    }
  };

  return (
    <div>
      <div className="switch-container">
        <div className={`switch ${apiOn ? 'on' : 'off'}`} onClick={handleApiToggle}>
          <div className="toggle" />
        </div>
        <label className="mantle-title switch-label">API Mode</label>
      </div>
      <div className="switch-container">
        <div className={`switch ${verifyOn ? 'on' : 'off'}`} onClick={handleVerifyToggle}>
          <div className="toggle" />
        </div>
        <label className="mantle-title switch-label">Verify</label>
      </div>
      <div class="form-container">
        <div class="form-row input-container-name">
          <label for="multiplier1" className="mantle-title smaller-title">Heroes:</label>
          <textarea id="multiplier1" value={multiplier1} onChange={(e) => setMultiplier1(e.target.value)} className="input-design"></textarea>
        </div>

        <div class="form-row input-container-name">
          <label for="multiplier2" className="mantle-title smaller-title">Abilities:</label>
          <textarea id="multiplier2" value={multiplier2} onChange={(e) => setMultiplier2(e.target.value)} className="input-design"></textarea>
        </div>

        <div class="form-row input-container-name">
          <label for="rangeMin" className="mantle-title smaller-title">Min Range:</label>
          <input type="number" id="rangeMin" value={rangeMin} onChange={(e) => setRangeMin(parseInt(e.target.value))} className="input-design"/>

          <label for="rangeMax input-container-name" className="mantle-title smaller-title">Max Range:</label>
          <input type="number" id="rangeMax" value={rangeMax} onChange={(e) => setRangeMax(parseInt(e.target.value))} className="input-design"/>
        </div>

        <div class="form-row input-container-name">
          <label for="maxSum" className="mantle-title smaller-title">Max Sum:</label>
          <input type="number" id="maxSum" value={maxSum} onChange={(e) => setMaxSum(parseInt(e.target.value))} className="input-design"/>
        </div>

        <div class="form-row input-container-name">
          <button onClick={generateNumbers} className="submit-button blue-button" type="submit">Hero Summoning</button>
        </div>

        {hexUsed ? (<div><div className="result-hex">
          <h3 className="result-title">Your verify hash is: {hexUsed}</h3>
        </div>
        <div className="results">
          <div className="heroes-container">{divs}</div>
        </div></div>) : (<div></div>)}
      </div>
    </div>
  );
};

export default Characters;
