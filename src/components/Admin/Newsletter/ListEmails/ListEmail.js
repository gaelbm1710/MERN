import React, {useState, useEffect} from 'react';
import {Newsletter} from "../../../../api";
import {useAuth} from "../../../../hooks"
import "./ListEmails.scss";
import {EmailItem} from "../EmailItem";
import {size, map} from "lodash";
import {Loader, Pagination} from "semantic-ui-react"

const newsletterController = new Newsletter();

export function ListEmail(props) {
    const [emails, setEmails] = useState(false);
    const {accessToken} = useAuth();
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1)
    const [reload, setReload] = useState(false);
    const onReload =() =>setReload((prevState) =>!prevState);
    useEffect(() => {
      (async ()=>{
        try {
            const response = await newsletterController.getEmails(accessToken, page);
            setEmails(response.docs);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.totalPages,
                });
        } catch (error) {
            console.error(error)
        }
      })();
      }, [accessToken, page, reload]);
    
    if(!emails) return <Loader active inline="centered"/>
    if(size(emails)===0) return "No hay Correos registrados";

    const changePage=(_,data)=>{
      setPage(data.activePage)
  }

  return (
    <div className='list-emails'>
        {map(emails, (email)=>(
            <EmailItem key={email._id} email={email} onReload={onReload}/>
        ))}
        <div className='list-emails__pagination'>
          <Pagination 
          totalPages={pagination.total}
          defaultActivePage={pagination.page}
          ellipsisItem={false}
          firstItem={false}
          lastItem={false}
          onPageChange={changePage}
          />
        </div>
    </div>

  )
}
