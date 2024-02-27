import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
      <Link to="/"><img className="logo" src="/src/assets/Logo_Streamboost.png" alt="Stream Boost" /></Link>
      <img className="avatar" src="/src/assets/avatar round.webp" alt="User" />
    </div>
  )
}

export default Navbar