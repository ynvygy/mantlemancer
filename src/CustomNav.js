import { Navbar, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';

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
          <div className="brand-container">
            <div className="brand-text">Mantlemancer</div>
          </div>
          <div className="ml-auto nav-link-container">
            <div className="brand-container">
              <div className="connected-text">
                {account ? (
                  <Nav.Link className="nav-link" onClick={disconnectHandler}>
                    Connected with address {account.slice(0, 6) + '...' + account.slice(38, 42)}
                  </Nav.Link>
                ) : (
                  <Nav.Link className="nav-link" onClick={connectWallet}>
                    Connect Wallet
                  </Nav.Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default CustomNav;
