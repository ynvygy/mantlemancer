import { useState } from "react";

const Drops = ({mantlemancerContract}) => {
  const [itemNames, setItemNames] = useState('');
  const [itemOdds, setItemOdds] = useState('');
  const [howManyItems, setHowManyItems] = useState('');
  const [rewards, setRewards] = useState([])
  const [apiOn, setApiOn] = useState(false);
  const [verifyOn, setVerifyOn] = useState(false);
  const [apiCall, setApiCall] = useState("");
  const [apiResponse, setApiResponse] = useState('');
  const [hashUsed, setHashUsed] = useState('');
  const [hexUsed, setHexUsed] = useState('');
  const [check, setCheck] = useState();
  const [verified, setVerified] = useState(false);

  const handleApiToggle = () => {
    setApiOn(!apiOn);
    const apiCallDemo = `
    {
      "items": {
        #INPUT USING "itemName": odds
      },
      "itemCount": #INPUT ITEM COUNT HERE
      }
    }`;
    setVerifyOn(false);
    setApiCall(apiCallDemo);
  };

  const apiResponseDemo = `
    {
      "drops": {
        "gold",
        "crystals"
      },
      "hex": "0x36e0e2ad178d961006334c968a7f38fc9e049070a61e5b8203219acebd7bfd59"
    }
  `

  const handleApiCallChange = (event) => {
    setApiCall(event.target.value);
  };

  const handleApiSubmit = async (event) => {
    event.preventDefault();
    
    try {
      setApiResponse(apiResponseDemo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyToggle = () => {
    setVerifyOn(!verifyOn);
    setApiOn(false);
  };

  const handleItemNamesChange = (event) => {
    setItemNames(event.target.value);
  };

  const handleItemOddsChange = (event) => {
    setItemOdds(event.target.value);
  };

  const handleHowManyItemsChange = (event) => {
    setHowManyItems(event.target.value);
  };

  const handleHashUsed = (event) => {
    setHashUsed(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const namesArray = itemNames.split('\n');
    const oddsArray = itemOdds.split('\n').map(Number);

    try {
      console.log(namesArray.length)
      console.log(oddsArray)
      console.log(parseInt(howManyItems, 10))
      const result = await mantlemancerContract.calculateDrops(
        namesArray.length,
        oddsArray,
        parseInt(howManyItems, 10)
      );
      setRewards(result[0].map((index) => namesArray[index]));
      setHexUsed(result[1]._hex);
      console.log('Rewards:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    const namesArray = itemNames.split('\n');
    const oddsArray = itemOdds.split('\n').map(Number);

    try {
      console.log(namesArray.length)
      console.log(oddsArray)
      console.log(parseInt(howManyItems, 10))
      const result = await mantlemancerContract.verifyDrop(
        namesArray.length,
        oddsArray,
        parseInt(howManyItems, 10),
        hexUsed
      );

      const drop = await mantlemancerContract.calculateDrops(
        namesArray.length,
        oddsArray,
        parseInt(howManyItems, 10)
      );

      hashUsed == hexUsed ? setCheck(true) : setCheck(false);
      setVerified(true);
      // setCheck(areEqual(result, drop[0]))
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const areEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].toString() != arr2[i].toString()) {
        return false;
      }
    }
    
    return true;
  };

  const handleCompensation = () => {
    console.log('Button clicked! Compensate user');
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
      {apiOn ? (
      <div>
        <div class="form-container">
          <form onSubmit={handleApiSubmit}>
            <div class="form-row input-container-name">
              <p className="mantle-title small-title">API Endpoint: api/v1/calculate-drops</p>
              <label htmlFor="apiCall" className="mantle-title smaller-title">Your API Call:</label>
              <textarea
                id="apiCall"
                className="api-text-area input-design"
                value={apiCall}
                onChange={handleApiCallChange}
              />
            </div>
            <div class="form-row input-container-name">  
              <button type="submit" className="submit-button yellow-button">Raidmaster's Spoils</button>
            </div>
          </form>
          {apiResponse ? (<div class="form-row input-container-name">
            <label htmlFor="apiResponse" className="mantle-title smaller-title">API Response Example:</label>
            <textarea
              id="apiResponse"
              value={apiResponse}
              className="api-text-area input-design"
              readOnly
            />
          </div>) : (<div></div>)}
        </div>
      </div>) : verifyOn ? (
      <div class="form-container">
        <form onSubmit={handleVerify}>
          <div class="form-row input-container-name">
            <label for="itemNames" className="mantle-title smaller-title">Items: </label>
            <textarea value={itemNames} id="itemNames" onChange={handleItemNamesChange} className="input-design">></textarea>
          </div>
          
          <div class="form-row input-container-name">    
            <label for="itemOdds" className="mantle-title smaller-title">Item Odds:</label>
            <textarea value={itemOdds} id="itemOdds" onChange={handleItemOddsChange} className="input-design"></textarea>
          </div>

          <div class="form-row input-container-name">       
            <label for="itemCount" className="mantle-title smaller-title">How Many Items:</label>
            <input type="number" value={howManyItems} id ="itemCount" onChange={handleHowManyItemsChange} className="input-design"></input>
          </div>

          <div class="form-row input-container-name">       
            <label for="hashUsed" className="mantle-title smaller-title">Hash Used:</label>
            <input type="text" value={hashUsed} id ="hasUsed" onChange={handleHashUsed} className="input-design"></input>
          </div>

          <div class="form-row input-container-name">  
            <button type="submit" className="submit-button verify-button">Don't Trust, Verify</button>
          </div>
          {!verified ? (<div></div>) : check ? (
          <div class="form-row input-container-name verify-container-name green"> 
            <h2>Valid</h2>
          </div>) : (
          <div class="form-row input-container-name verify-container-name red"> 
            <h2>Scam</h2>
          </div>)}
          {verified && check == false ? <div class="form-row input-container-name">  
            <button className="submit-button verify-button" onClick={handleCompensation}>Get compensated</button>
          </div> : <div></div>}
        </form>
      </div>) : (
      <div class="form-container">
        <form onSubmit={handleSubmit}>
          <div class="form-row input-container-name">
            <label for="itemNames" className="mantle-title smaller-title">Items: </label>
            <textarea value={itemNames} id="itemNames" onChange={handleItemNamesChange} className="input-design">></textarea>
          </div>
          
          <div class="form-row input-container-name">    
            <label for="itemOdds" className="mantle-title smaller-title">Item Odds:</label>
            <textarea value={itemOdds} id="itemOdds" onChange={handleItemOddsChange} className="input-design"></textarea>
          </div>

          <div class="form-row input-container-name">       
            <label for="itemCount" className="mantle-title smaller-title">How Many Items:</label>
            <input type="number" value={howManyItems} id ="itemCount" onChange={handleHowManyItemsChange} className="input-design"></input>
          </div>

          <div class="form-row input-container-name">  
            <button type="submit" className="submit-button yellow-button">Raidmaster's Spoils</button>
          </div>
        </form>

        {rewards.length > 0 && (
          <div>
            <div className="result-hex">
              <h3 className="result-title">Your verify hash is: {hexUsed}</h3>
            </div>
            <div className="result-div item-result">
              <h3 className="result-title">Your drops are:</h3>
              <ul className="drops-list drops-align">
                {rewards.map((reward, index) => (
                  <li className="result-title smaller-text" key={index}>{reward}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default Drops;
