import React, { useEffect, useState } from 'react';
import { Mag } from '../../../../api';
import { Loader, Pagination, Search, Label } from 'semantic-ui-react';
import { InydeItem } from '../InydeItem/InydeItem';
import _, { map, size } from 'lodash';

const magController = new Mag();

export function ListInyde(props) {
  const { reload, onReload, onClose, mag } = props;
  const [mags, setMags] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const actividad = 'nueva'
  useEffect(() => {
    (async () => {
      try {
        const response = await magController.getMagActividadNueva(actividad, { page, limit: 9 });
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


 
  

  const changePage = (_, data) => {
    setPage(data.activePage);
  };


  if (!mags) return <Loader active inline="centered" />;
  if (size(mags) === 0) return 'No hay cotizaciones';

  return (
    <div className="list-cotizaciones">
      <Search 
      
      />
      {map(mags, (mag) => (
        <InydeItem key={mag._id} mag={mag} onReload={onReload} onClose={onClose} />
      ))}
      <div className="list-cotizaciones__pagination">
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
  );
}
