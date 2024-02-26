import React, {useEffect,useState} from 'react';
import "./TopBar.scss";
import { Container} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {Icon} from "../../../assets";
import { map } from 'lodash';
import {Menu} from "../../../api";

const menuController = new Menu();

export function TopBar() {
    const [menu, setMenu] = useState(null);
    console.log(menu);
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
    
  return (
    <div className='top-bar'>
        <Container>
            <div className='top-bar__left'>
                <Link to="/" className='logo'>
                    <Icon.LogoWhite/>
                </Link>
                <div className='menu'>
                    {map(menu, (item) =>(
                       <a key={item._id} href={item.path}>{item.title}</a> 
                    ))}
                </div>
            </div>
        </Container>
    </div>
  )
}
