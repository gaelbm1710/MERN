import React, { useState } from 'react';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { ENV } from '../../../../utils';
import { User } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { BasicModal } from '../../../Shared';
import { initialValues, validationSchema } from '../PerfilForm/PerfilForm.form';
import { PerfilForm } from '../PerfilForm/PerfilForm';

const userController = new User();

export function PerfilItem(props) {
    const { accessToken } = useAuth();
    const { user, onReload } = props;

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    const onOpenCloseModal = () => setShowModal(prev => !prev);
    const onOpenCloseConfirm = () => setShowConfirm(prev => !prev);

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
            console.error("Error deleting user:", error);
        }
    };

    const imageUrl = user?.avatar ? `${ENV.USUSARIOS}/${user.avatar}` : 'ruta_de_imagen_por_defecto';

    const initialValuesForForm = initialValues(user);
    const validationSchemaForForm = validationSchema(user);

    return (
        <>
            <div className='user-item'>
                <div className='user-item__info'>
                    <Image avatar src={imageUrl} />
                    <div>
                        <p>Nombre: {user && `${user.firstname} ${user.lastname}`}</p>
                        <p>Email: {user && user.email}</p>
                        <p>Rol: {user && user.role}</p>
                    </div>
                </div>
                <div>
                    <Button icon primary onClick={openUpdateUser}>
                        <Icon name='edit' />
                    </Button>
                    <Button icon color={user && user.active ? "orange" : "teal"} onClick={openDesactivateActivateConfirm}>
                        <Icon name={user && user.active ? "ban" : "check"} />
                    </Button>
                    <Button icon color='red' onClick={openDeleteConfirm}>
                        <Icon name='trash alternate outline' />
                    </Button>
                </div>
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <PerfilForm close={onOpenCloseModal} onReload={onReload} initialValues={initialValuesForForm} validationSchema={validationSchemaForForm} />
            </BasicModal>
            <Confirm open={showConfirm} onCancel={onOpenCloseConfirm} onConfirm={isDelete ? onDelete : onActivateDesactivate} content={confirmMessage} size='mini' />
        </>
    );
}