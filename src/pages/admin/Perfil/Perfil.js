import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks';
import { PerfilItem } from '../../../components/Admin/Perfil/PerfilItem';
import { Button, Container, Segment } from 'semantic-ui-react';
import { Image } from "semantic-ui-react";
import { image } from "../../../assets";
import { ENV } from '../../../utils';
import "./Perfil.scss";
import { User } from "../../../api/user";
import { UserForm } from '../../../components/Admin/Users';

const userController = new User();

export function Perfil() {
    const { accessToken, user: currentUser } = useAuth(); 
    const [userProfile, setUserProfile] = useState(null); 
    const [titleModal, setTitleModal] = useState("");
    const [showModal, setShowModal] = useState(false);

    const onOpenCloseModal = () => setShowModal(prev => !prev);

    const openUpdateUser = () => {
        setTitleModal(`Actualizar ${currentUser.email}`);
        onOpenCloseModal();
    }
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await userController.getUserById(accessToken, currentUser._id); 
                setUserProfile(userData); 
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (currentUser) {
            fetchUserProfile(); 
        }
    }, [accessToken, currentUser]);

    const imagenUrl = currentUser && currentUser.avatar ? `${ENV.USUSARIOS}/${currentUser.avatar}` : image.noAvatar;

    return (
        <Container>
            <div className="perfil">
                <div className="imagen-perfil">
                    <Image avatar src={imagenUrl} />
                </div>
                <h1>Mi Perfil</h1>
                {userProfile && <PerfilItem user={userProfile} onReload={() => setUserProfile(null)} />}
                <h3>Nombre: {currentUser && `${currentUser.firstname} ${currentUser.lastname}`}</h3>
                <h3>Email: {currentUser && currentUser.email}</h3>
                <h3>Rol: {currentUser && currentUser.role}</h3>
                <Button className='psw-page' primary onClick={openUpdateUser}>Editar</Button>
            </div>
        </Container>
    );
}