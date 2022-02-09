import "../style/navbar.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { selectCurrentUser, selectToken } from '../redux/user/userSelectors';
import { signOut } from '../redux/user/userActions';
import Modal from 'react-modal';

function Navbar({ currentUser, token, signOut }) {
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [MenuItems, setMenuItems] = useState([
    {
      name: "Home",
      link: "/",
    },
    // {
    //   name: "About Us",
    //   link: "#",
    // },
    {
      name: "Sign Up",
      link: "/signup",
    },
    {
      name: "Login",
      link: "/login",
    }
  ]);

  useEffect(() => {
    if(currentUser) {
      setMenuItems([...MenuItems.filter((item) => item.name !== "Sign Up" && item.name !== "Login"), { name: currentUser.email, link: "signout" }]);
    } else if(MenuItems.length === 2) {
      setMenuItems([...MenuItems.filter((item) => item.link !== "signout"), { name: "Sign Up", link: "/signup" }, { name: "Login", link: "#" }])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleNavigate = (item) => {
    if(item.link === "signout") {
      setShowModal(true);
    } else {
      navigate(item.link);
    }
  };

  return (
    <>
      <nav className="navbar-items">
        <h1 className="logo">LOGO</h1>
        <ul className="nav-menu">
          { MenuItems.map((item) => {
            return(
              <li key={item.name}><p className="navbar-item" onClick={() => handleNavigate(item)}>{item.name}</p></li>
            );
          }) }
        </ul>
      </nav>
      <Modal 
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={{content: { 
          width: "30%",
          height: "30%",
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        }}}
      >
          <button onClick={() => {
            setShowModal(false);
            signOut();
            navigate("/");
          }}>
            Sign Out
          </button>
          <button onClick={() => {
            setShowModal(false);
          }}>
            Close
          </button>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
	token: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () =>
  dispatch(signOut()),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
  