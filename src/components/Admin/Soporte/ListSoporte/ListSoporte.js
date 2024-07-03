import React, { useState, useEffect } from 'react'
import { Soporte } from "../../../../api"
import { size, map } from 'lodash'
import { Loader, Pagination } from "semantic-ui-react";
import { SoporteItem } from '../SoporteItem/SoporteItem';
import "./ListSoporte.scss";

const soporteController = new Soporte();
export function ListSoporte(props) {
  const { reload, onReload, close } = props;
  const [soportes, setSoportes] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  useEffect(() => {
    (async () => {
      try {
        const response = await soporteController.getSoporte({ page, limit: 10 });
        setSoportes(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.totalPages,
        });
      } catch (error) {
        console.error(error);
      }
    })()
  }, [page, reload])

  const changePage = (_, data) => {
    setPage(data.activePage)
  }

  if (!soportes) return <Loader active inline="centered" />
  if (size(soportes) === 0) return "No hay ningún Ticket";

  return (
    <div className='list-soporte'>
      {map(soportes, (soporte) => (
        <SoporteItem key={soporte._id} soporte={soporte} onReload={onReload} close={close} />
      ))}
      <div className='list-soporte__pagination'>
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
