/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Mag } from '../../../../api';
import { map } from 'lodash';
import { Loader, Pagination, Search } from 'semantic-ui-react';
import { AsesorItem } from '../AsesorItem/AsesorItem';
import { useAuth } from '../../../../hooks';

const magController = new Mag();


export function ListbAsesor(props) {
  const { reload, onReload, onClose } = props;
  const [mags, setMags] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const { user: { email } } = useAuth();
  const CorreoAsesor = email;

  const fetchMags = async (page) => {
    try {
      const response = await magController.getMagByCambioBase(CorreoAsesor, { page, limit: 10 });
      return response;
    } catch (error) {
      console.error(error);
      return { docs: [], limit: 0, page: 0, pages: 0, totalPages: 0 };
    }
  };

  const loadMags = async () => {
    const response = await fetchMags(page);
    setMags(response.docs);
    setPagination({
      limit: response.limit,
      page: response.page,
      pages: response.pages,
      total: response.totalPages,
    });
  };

  const loadAllMags = async () => {
    let allMags = [];
    for (let i = 1; i <= pagination.total; i++) {
      const response = await fetchMags(i);
      allMags = allMags.concat(response.docs);
    }
    return allMags;
  };

  useEffect(() => {
    loadMags();
  }, [page, reload]);

  useEffect(() => {
    if (searchTerm) {
      (async () => {
        const allMags = await loadAllMags();
        setMags(allMags);
      })();
    } else {
      loadMags();
    }
  }, [searchTerm, reload]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  const handleSearchChange = (_, { value }) => {
    setSearchTerm(value);
  };

  const filterMags = () => {
    if (!searchTerm) {
      return mags;
    } else {
      return mags.filter(mag =>
        (mag.folio && mag.folio.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (mag.folio_sCom && mag.folio_sCom.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (mag.cliente && mag.cliente.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (mag.cardcode && mag.cardcode.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  };

  if (!mags) return <Loader active inline="centered" />;
  if (mags.length === 0) return 'No hay cotizaciones';

  return (
    <div className='list-cotizaciones'>
      <Search
        onSearchChange={handleSearchChange}
        value={searchTerm}
        placeholder="Buscar..."
        showNoResults={false}
      />
      {map(filterMags(), mag => (
        <AsesorItem key={mag._id} mag={mag} onReload={onReload} onClose={onClose} />
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
  );
}
