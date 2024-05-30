import React, { useState } from 'react';
import "./UserItem.scss";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils"
import { BasicModal } from "../../../Shared"
import { USerForm } from "../UserForm"
import { User } from "../../../../api"
import { useAuth } from "../../../../hooks"

const userController = new User();

export function UserItem(props) {
    const { accessToken } = useAuth();
    const { user, onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdateUser = () => {
        setTitleModal(`Actualizar ${user.email}`);
        onOpenCloseModal();
    }

    const onActivateDesactivate = async () => {
        try {
            await userController.updateUserActive(accessToken, user._id, {
                active: !user.active,
                email: user.email
            });
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error("Error during activation/deactivation:", error);
        }
    };

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(user.active ? `Desactivar usuario ${user.email}` : `Activar usuario ${user.email}`);
        onOpenCloseConfirm();
    }

    const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Eliminar al usuario ${user.email}`);
        onOpenCloseConfirm();
    }

    const onDelete = async () => {
        try {
            await userController.deleteUser(accessToken, user._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    };

    const imageUrl = user.avatar ? `${ENV.USUSARIOS}/${user.avatar}` : image.noAvatar;

    return (
        <>
            <div className='user-item'>
                <div className='user-item__info'>
                    <Image avatar src={imageUrl} />
                    <div>
                        <p>Nombre: {user.firstname} {user.lastname}</p>
                        <p>Email: {user.email}</p>
                        <p>Rol: {user.role}</p>
                    </div>
                </div>
                <div>
                    <Button icon primary onClick={openUpdateUser}>
                        <Icon name='edit' />
                    </Button>
                    <Button icon color={user.active ? "orange" : "teal"} onClick={openDesactivateActivateConfirm}>
                        <Icon name={user.active ? "ban" : "check"} />
                    </Button>
                    <Button icon color='red' onClick={openDeleteConfirm}>
                        <Icon name='trash alternate outline' />
                    </Button>
                </div>
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <USerForm close={onOpenCloseModal} onReload={onReload} user={user} />
            </BasicModal>
            <Confirm open={showConfirm} onCancel={onOpenCloseConfirm} onConfirm={isDelete ? onDelete : onActivateDesactivate} content={confirmMessage} size='mini' />
        </>
    );
}
