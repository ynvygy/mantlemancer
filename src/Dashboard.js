import { useNavigate } from 'react-router-dom';
const Dashboard = ({ account, mantlemancerContract }) => {
  return (
    <div>
      {account ? (
        <div>
          <div className="skills-container">
            <h1 className="mantle-title">Skills</h1>
            <h1 className="mantle-title small-title">Ascending from the ashes</h1>
            <div>
              <Button1 />
              <Button2 />
              <Button3 />
            </div>
            <h1 className="mantle-title small-title">Healing wounds (BETA)</h1>
            <div>
              <Button5 />
              <Button6 />
              <Button7 />
              <Button8 />
            </div>
            <h1 className="mantle-title  small-title">Ultimate</h1>
            <div>
              <Button4 />
            </div>
          </div>
        </div>
        ) :
        (
        <div className="mantle-container">
          <div className="text-center">
            <h1 className="mantle-title">
              Not all superheroes wear capes<br />Some wear a{" "}
              <span className="mantle-text">MANTLE</span>
            </h1>
          </div>
        </div>
        )}
    </div>
  );
};

const Button1 = () => {
  const navigate = useNavigate();

  const handleButton1Click = () => {
    navigate("/characters");
  };

  return (
    <button className="skill-button blue-button" onClick={handleButton1Click}>
      Hero Summoning
    </button>
  );
};

const Button2 = () => {
  const navigate = useNavigate();

  const handleButton1Click = () => {
    navigate("/drops");
  };

  return (
    <button className="skill-button yellow-button" onClick={handleButton1Click}>
      Raidmaster's Spoils
    </button>
  );
};

const Button3 = () => {
  const navigate = useNavigate();

  const handleButton1Click = () => {
    navigate("/items");
  };

  return (
    <button className="skill-button red-button" onClick={handleButton1Click}>
      Mystic Forging
    </button>
  );
};

const Button4 = () => {
  const navigate = useNavigate();

  const handleButton1Click = () => {
    navigate("/simulator");
  };

  return (
    <button className="skill-button black-button" onClick={handleButton1Click}>
      Genesis Architect
    </button>
  );
};

const Button5 = () => {
  const navigate = useNavigate();

  const handleButton1Click = () => {
    navigate("/");
  };

  return (
    <button className="skill-button button5" onClick={handleButton1Click}>
      Tenacity Aura
    </button>
  );
};

const Button6 = () => {
  const navigate = useNavigate();

  const handleButton1Click = () => {
    navigate("/");
  };

  return (
    <button className="skill-button button6" onClick={handleButton1Click}>
      Quest Conqueror
    </button>
  );
};

const Button7 = () => {
  const navigate = useNavigate();

  const handleButton1Click = () => {
    navigate("/");
  };

  return (
    <button className="skill-button button7" onClick={handleButton1Click}>
      Wealth Guardian
    </button>
  );
};

const Button8 = () => {
  const navigate = useNavigate();

  const handleButton1Click = () => {
    navigate("/");
  };

  return (
    <button className="skill-button button8" onClick={handleButton1Click}>
      Market Oracle
    </button>
  );
};

export default Dashboard;

