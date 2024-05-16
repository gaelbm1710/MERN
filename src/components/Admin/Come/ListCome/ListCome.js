import React, { useEffect, useState } from 'react';
import { Mag } from '../../../../api';
import { size, map } from 'lodash';
import { Loader, Pagination, Search } from 'semantic-ui-react';
import { ComeItem } from "../ComeItem";
import "./ListCome.scss";

const magController = new Mag();

export function ListCome(props) {
  const { reload, onReload, onClose } = props;
  const [mags, setMags] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMags, setFilteredMags] = useState([]);
  const actividad = 'nueva';

  useEffect(() => {
    const fetchMags = async () => {
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
    };

    fetchMags();
  }, [page, reload]);

  useEffect(() => {
    const searchFilteredMags = () => {
      const filtered = mags.filter((mag) => (
        (mag.asesor && mag.asesor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (mag.cardcode && mag.cardcode.toLowerCase().includes(searchQuery.toLowerCase()))
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
  if (size(mags) === 0) return "No hay cotizaciones";

  return (
    <div className='list-cotizaciones'>
      <Search
        input={{ icon: 'search', iconPosition: 'left' }}
        placeholder="Buscar..."
        value={searchQuery}
        onSearchChange={handleSearchChange}
        showNoResults=""
      />
      <br />
      {[...filteredMags].map((mag) => (
        <ComeItem key={mag._id} mag={mag} onReload={onReload} onClose={onClose} />
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