import React from 'react';
import { Dropdown, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks";
import { image } from "../../../../assets";
import { ENV } from '../../../../utils';
import "./Logout.scss";


export function Logout() {
    const { logout, user: { avatar } } = useAuth();
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

    const profileIconStyle = {
        fontSize: '20px',
        alignItems: 'center',
    };

    const imagenUrl = avatar ? `${ENV.USUSARIOS}/${avatar}` : image.noAvatar;

    return (
        <div>
            <Dropdown
                icon={null}
                trigger={(
                    <div >
                        <div>
                            <Image avatar src={imagenUrl} style={profileIconStyle} />
                        </div>
                    </div>
                )}
                pointing='top right'  // Posiciona el menú
                options={menuItems}
            />
        </div>
    );
}
