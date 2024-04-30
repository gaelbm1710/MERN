import React from 'react';
import { Button, Dropdown, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks";

export function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/");
    };

    // Define los elementos del menú desplegable
    const menuItems = [
        //{ key: 'profile', text: 'Proximamente', icon: 'user' },
        { key: 'logout', text: 'Cerrar Sesión', icon: 'sign-out', onClick: onLogout },
    ];

    const profileIconStyle ={
        fontSize: '20px',
        alignItems: 'center',
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown
                icon={null}
                trigger={(
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            backgroundColor: '#0081c1', 
                            color: 'white', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}>
                            <Icon name='user' style={profileIconStyle} />
                        </div>
                    </div>
                )}
                pointing='top right'  // Posiciona el menú
                options={menuItems}
            />
        </div>
    );
}
