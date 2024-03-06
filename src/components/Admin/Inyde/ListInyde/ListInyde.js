import React, {useEffect, useState} from 'react';
import {Mag} from "../../../../api";
import { size, map } from 'lodash';
import { Loader, Pagination } from 'semantic-ui-react';
import { InydeItem } from '../InydeItem/InydeItem';

const magController = new Mag();

export function ListInyde(props){
    const {reload, onReload, onClose} = props;
    const [mags, setMags] = useState(null)
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState()
    useEffect(() => {
      (async () =>{
        try {
            const response = await magController.getMag({page, limit: 10})     
            setMags(response.docs);
            setPagination({
                limit: response.limit,
                page: response.page,
                pages: response.pages,
                total: response.totalPages,
            });
        } catch (error) {
            console.error(error)
        }
      })()
    }, [page, reload])

    const changePage=(_,data)=>{
        setPage(data.activePage)
    }
    
    if(!mags) return <Loader active inline="centered"/>
    if(size(mags)===0)return "No hay cotizaciones";
  return (
    <div className='list-cotizaciones'>
        {map(mags, (mag)=>(
            <InydeItem key={mag._id} mag={mag} onReload={onReload} onClose={onClose}/>
        ))}
        <div className='list-cotizaciones__pagination'>
            <Pagination
            totalPages={pagination.total}
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={changePage}
            />
        </div>
    </div>
  )
}
