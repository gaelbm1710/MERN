import React, { useEffect, useState, useRef } from 'react';
import { Mag } from '../../../../api';
import { Loader, Pagination, Icon } from 'semantic-ui-react';
import { InydeItem } from '../InydeItem/InydeItem';
import { map, size } from 'lodash';
import { SearchResultList } from './SearchResultList';

const magController = new Mag();

export function ListInyde(props) {
  const { reload, onReload, onClose } = props;
  const [mags, setMags] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const [input, setInput] = useState("");
  const [results, setResults] = useState();
  const actividad = 'nueva';
  const searchRef = useRef(null); 
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
        console.error(error);
      }
    })();
  }, [page, reload]);

  const handleChange = async (value) => {
    setInput(value);
    try {
      const response = await magController.getMagActividadNueva(actividad, { page, limit: 10 });
      setMags(response.docs);
      setPagination({
        limit: response.limit,
        page: response.page,
        pages: response.pages,
        total: response.totalPages,
      });
      const results = response.docs.filter((mag) => {
        return (
          mag.folio && mag.folio.toString().toLowerCase().includes(value.toLowerCase()) ||
          mag.folio_IyD && mag.folio_IyD.toString().toLowerCase().includes(value.toLowerCase()) ||
          mag.folio_sCom && mag.folio_sCom.toString().toLowerCase().includes(value.toLowerCase()) ||
          mag.cliente && mag.cliente.toLowerCase().includes(value.toLowerCase()) ||
          mag.base && mag.base.toLowerCase().includes(value.toLowerCase()) ||
          mag.cardcode && mag.cardcode.toLowerCase().includes(value.toLowerCase()) ||
          mag.activos && mag.activos.toLowerCase().includes(value.toLowerCase()) ||
          mag.asesor && mag.asesor.toLowerCase().includes(value.toLowerCase())
        );
      });
      setResults(results);
    } catch (error) {
      console.error(error);
    }
  };

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!mags) return <Loader active inline="centered" />;
  if (size(mags) === 0) return 'No hay cotizaciones';

  return (
    <div className="list-cotizaciones">
      <Icon name='search' />
      <input
        ref={searchRef}
        placeholder='Buscar...'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <SearchResultList results={results} />
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
