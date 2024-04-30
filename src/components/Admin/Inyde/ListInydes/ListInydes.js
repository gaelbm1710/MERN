import React, { useEffect, useState } from 'react'
import { Mag } from '../../../../api'
import { Loader, Pagination, Search } from 'semantic-ui-react'
import { InydeItem } from '../InydeItem';

const magController = new Mag();

export function ListInydes(props) {
  const { reload, onReload, onClose } = props;
  const [mags, setMags] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMags, setFilteredMags] = useState([]);
  const actividad = 'presentacion'
  useEffect(() => {
    const fetchMags = async () => {
      try {
        const response = await magController.getMagActividadPresentacion(actividad,{ page, limit: 10 });
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
    };

    fetchMags();
  }, [page, reload]);

  useEffect(() => {
    const searchFilteredMags = () => {
      const filtered = mags.filter((mag) => (
        (mag.asesor && mag.asesor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (mag.cardcode && mag.cardcode.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (mag.base && mag.base.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (mag.folio_IyD && mag.folio_IyD.toString().includes(searchQuery.toString()))
      ));
      setFilteredMags(filtered);
    };

    searchFilteredMags();
  }, [searchQuery, mags]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  const handleSearchChange = (_, { value }) => {
    setSearchQuery(value);
  };

  if (!mags) return <Loader active inline="centered" />;
  if (mags.length === 0) return 'No hay cotizaciones';

  return (
    <div className="list-cotizaciones">
      <Search
        input={{ icon: 'search', iconPosition: 'left' }}
        placeholder="Buscar..."
        value={searchQuery}
        onSearchChange={handleSearchChange}
        showNoResults=""
      />
      <br />
      {[...filteredMags].map((mag) => (
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
