import logo from '../../images/logo.svg';
import "./Header.css"

function Header({ query, onChangeHander }) {
  return (
    <header className="header">
      <img src={logo} alt="Timescale" />
      <input className="search_input" type="text" name="search" placeholder="Search for a movie" value={query} onChange={onChangeHander} />
    </header>
  )
}

export default Header
