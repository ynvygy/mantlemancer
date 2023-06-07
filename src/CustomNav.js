import { Navbar, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CustomNav = ({ account, setAccount, connectWallet, disconnectHandler }) => {
  const [selectedLink, setSelectedLink] = useState('');

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    localStorage.setItem('selectedLink', link);
  };

  useEffect(() => {
    connectWallet();
    const storedLink = localStorage.getItem('selectedLink');
    if (storedLink) {
      setSelectedLink(storedLink);
    }
  }, []);

  return (
    <>
      <Navbar bg="light" expand="lg" className="top-navbar">
        <div className="navbar-container">
          <div className="ml-auto nav-link-container">
            {account ? (
              <div className="brand-container">
                <div className="connected-text staker">
                  <Nav.Link as={Link} to="/staking">Stake</Nav.Link>
                </div>
                <div className="connected-text">
                  <Nav.Link className="nav-link" onClick={disconnectHandler}>
                    You are the Mantlemancer ({account.slice(0, 6) + '...' + account.slice(38, 42)})
                  </Nav.Link>
                </div>
              </div>
            ) : (
              <div className="brand-container">
                <div className="connected-text">
                <Nav.Link className="nav-link" onClick={connectWallet}>
                  Become a Mantlemancer
                </Nav.Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default CustomNav;
