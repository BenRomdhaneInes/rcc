import { useNavigate } from 'react-router-dom';
import logo from '../../images/pokeapi.png'

import './style.css'
const Header = () =>{
  const navigate = useNavigate()
  return(
    <div className="header">
      <img src={logo} height='40px' alt='pokemon' onClick={() => navigate('/')}/>
    </div>
  )
}
export default Header