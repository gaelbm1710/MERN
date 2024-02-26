import React, { useState } from 'react'
import "./EmailItem.scss";
import {Button, Icon, Confirm} from "semantic-ui-react";
import {ENV} from "../../../../api";
import {Newsletter} from "../../../../api";
import {useAuth} from "../../../../hooks";

const newsletterController = new Newsletter();

export function EmailItem(props) {
  const {email, onReload} = props;
  const {accessToken} = useAuth();
  const [showConfirm, setShowConfirm] = useState();

  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () =>{
    try {
      await newsletterController.deleteEmails(accessToken, email._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='newsletter-item'>
          <span>{email.email}</span>
          <div>
            <Button icon color="red" onClick={onOpenCloseConfirm}>
              <Icon name='trash alternate outline' />
            </Button>
          </div>
      </div>
      <Confirm 
    open={showConfirm}
    onCancel={onOpenCloseConfirm}
    onConfirm={onDelete}
    content={`ELiminar el Email: ${email.email}`}
    size='mini'
    />
    </>
  )
}
