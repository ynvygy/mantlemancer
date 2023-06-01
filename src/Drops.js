import { useState } from "react";

const Drops = ({mantlemancerContract}) => {
  const [itemNames, setItemNames] = useState('');
  const [itemOdds, setItemOdds] = useState('');
  const [howManyItems, setHowManyItems] = useState('');
  const [rewards, setRewards] = useState([])

  const handleItemNamesChange = (event) => {
    setItemNames(event.target.value);
  };

  const handleItemOddsChange = (event) => {
    setItemOdds(event.target.value);
  };

  const handleHowManyItemsChange = (event) => {
    setHowManyItems(event.target.value);
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
      setRewards(result.map((index) => namesArray[index]));
      console.log('Rewards:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Item Names:
          <textarea
            value={itemNames}
            onChange={handleItemNamesChange}
          />
        </label>
        <br />
        <label>
          Item Odds:
          <textarea
            value={itemOdds}
            onChange={handleItemOddsChange}
          />
        </label>
        <br />
        <label>
          How Many Items:
          <input
            type="number"
            value={howManyItems}
            onChange={handleHowManyItemsChange}
          />
        </label>
        <br />
        <button type="submit">Calculate Rewards</button>
      </form>

      {rewards.length > 0 && (
        <div>
          <h3>Rewards:</h3>
          <ul>
            {rewards.map((reward, index) => (
              <li key={index}>{reward}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Drops;