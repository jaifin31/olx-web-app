import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import './Header.css'
import OlxLogo from '../../assets/OlxLogo'
import Search from '../../assets/Search'
import Arrow from '../../assets/Arrow'
import SellButton from '../../assets/SellButton'
import SellButtonPlus from '../../assets/SellButtonPlus'
import { AuthContext } from '../../store/Context'

function Header() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        setUser(null)
        navigate('/login')
      })
      .catch((error) => {
        console.error('Logout error:', error)
      })
  }
  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSaleClick = () => {
    if (user) {
      navigate('/create')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        {/* <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` : 'Login'}</span>
      
          {user && (
            <span onClick={handleLogout} className="logout-span">
              Logout
            </span>
          )}
        </div> */}
        <div className="loginPage">
          {user ? (
            <>
              <span>Welcome {user.displayName}</span>
              <span onClick={handleLogout}>Logout</span>
            </>
          ) : (
            <span onClick={handleLoginClick}>Login</span>
          )}
        </div>
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={handleSaleClick}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
