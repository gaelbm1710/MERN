import React, {useEffect,useState} from 'react';
import "./TopBar.scss";
import { Container, Icon, Button} from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import {Icon as Imagen} from "../../../assets";
import { map } from 'lodash';
import {Menu} from "../../../api";
import { useAuth } from '../../../hooks';


const menuController = new Menu();

export function TopBar() {
    const [menu, setMenu] = useState(null);
    const {login} = useAuth(); 
    //console.log(menu);
    const navigate = useNavigate();
    useEffect(() => {
      (async()=>{
        try {
            const response = await menuController.getMenu(true);
            setMenu(response)
        } catch (error) {
            console.error(error);
        }
      })()
    }, [])

    const onLogin = () =>{
      login();
      navigate("/admin");
  }
    
  return (
    <div className='top-bar'>
        <Container>
            <div className='top-bar__left'>
                <Link to="/" className='logo'>
                    <Imagen.LogoWhite/>
                </Link>
                <div className='menu'>
                    {map(menu, (item) =>(
                       <a key={item._id} href={item.path}>{item.title}</a> 
                    ))}
                </div>
            </div>
            <div className='top-bar__right'>
              <Button icon basic color='grey' onClick={onLogin} className='login'>
                <Icon name='user'/> Iniciar Sesión
              </Button>
            </div>
        </Container>
    </div>
  )
}
