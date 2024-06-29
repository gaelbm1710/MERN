import React, {useState, useEffect} from "react";
import { Marketing } from "../../../api/marketing";
import { map, size } from "lodash";
import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table, Pagination, Loader, Input, Button, Dropdown  } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./Markpromos.scss"

const reppromosController = new Marketing();

export function Markpromos() {
    const [promo, setPromo] = useState([]);
    const [filteredPromo, setFilteredPromo] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        limit: 20,
        total: 0,
    });
    const [filters, setFilters] = useState({
        cardcode: "",
        nombre: "",
        correo: "",
        transactionid: "",
        itemcode: "",
        totalproducts: "",
        promotionalcodesid: "",
        promotionalcodeamount: "",
        creacion: "",
        pago: "",
        totalcost: ""
    });

    useEffect(() => {
        { }
        (async () => {
            try {
                const reponse = await reppromosController.getReportePromos();
                const halfResponse = reponse.slice(0, Math.ceil(reponse.length / 6));
                setPromo(halfResponse);
                setFilteredPromo(halfResponse);
                setPagination({
                    ...pagination,
                    total: halfResponse.length,
                });
            }catch (error) {
                console.error(error);
            }
        })();
    }, []);
    
    useEffect(() => {
        const applyFilters = () => {
            const filtered = promo.filter(data => {
                return Object.keys(filters).every(key => {
                    if (!filters[key]) return true;
                    if (key === 'responsedate' || key === 'createdate') {
                        return new Date(data[key]).toLocaleDateString() === new Date(filters[key]).toLocaleDateString();
                    }
                    return String(data[key]).toLowerCase().includes(filters[key].toLowerCase());
                });
            });
            setFilteredPromo(filtered);
            setPagination({
                ...pagination,
                total:filtered.length,
            });
            setPage(1);
        };
        applyFilters();
    },[filters, promo]);

    const changePage = (_, data) => {
        setPage(data.activePage);
    };

    const handleFilterChange = (e, { name, value }) => {
        setFilters({ ...filters, [name]: value });
    };

    const handleDateChange = (date, name) => {
        setFilters({ ...filters, [name]: date });
    };

    const startIndex = (page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    const paginatedPromos = filteredPromo.slice(startIndex, endIndex);

    if (!promo) return <h1>Error al traer la información</h1>;
    if (size(promo) === 0) return <Loader active inline="centered" />;

    return (
        <>
            <div className="title">
                <h1>Transacciones con Código Promocional</h1>
            </div>
            <div className="export-button">
                <Button value="exportar" primary onClick={reppromosController.exportReportePromos}>Exportar</Button>
            </div>
            <div className="filters">
                <h2>Filtros</h2>
            </div>
            <div className="filters-container">
                <div className="filter-item">
                <span>Cardcode: <Input name="cardcode" value={filters.cardcode} onChange={handleFilterChange} placeholder="Filtrar por Cardcode" /></span>
                </div>
                <div className="filter-item">
                    <span>Cliente: <Input name="nombre" value={filters.nombre} onChange={handleFilterChange} placeholder="Filtrar por Cliente" /></span>
                </div>
                <div className="filter-item">
                    <span>Correo: <Input name="correo" value={filters.correo} onChange={handleFilterChange} placeholder="Filtrar por Correo" /></span>
                </div>
                <div className="filter-item">
                    <span>DXP: <Input name="transactionid" value={filters.transactionid} onChange={handleFilterChange} placeholder="Filtrar por DXP" /></span>
                </div>
                <div className="filter-item">
                    <span>Codigo: <Input name="itemcode" value={filters.itemcode} onChange={handleFilterChange} placeholder="Filtrar por Codigo" /></span>
                </div>
                <div className="filter-item">
                    <span>Codigo promocional: <Input name="promotionalcodesid" value={filters.promotionalcodesid} onChange={handleFilterChange} placeholder="Filtrar por Codigo promocional" /></span>
                </div>
                <div className="filter-item">
                    <span>Creación: <DatePicker selected={filters.creacion} onChange={date => handleDateChange(date, 'creacion')} dateFormat="yyyy/MM/dd" showIcon isClearable /></span>
                </div>
                <div className="filter-item">
                    <span>Producto: <Input name="itemcode" value={filters.itemcode} onChange={handleFilterChange} placeholder="Filtrar por Producto" /></span>
                </div>
            </div>
            <br/>
            <div className="tabla-reporte">
                <Table celled>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Cardcode</TableHeaderCell>
                            <TableHeaderCell>Cliente</TableHeaderCell>
                            <TableHeaderCell>Correo</TableHeaderCell>
                            <TableHeaderCell>DXP</TableHeaderCell>
                            <TableHeaderCell>Producto</TableHeaderCell>
                            <TableHeaderCell>Total productos</TableHeaderCell>
                            <TableHeaderCell>Codigo promocional</TableHeaderCell>
                            <TableHeaderCell>Cantidad de descuento</TableHeaderCell>
                            <TableHeaderCell>Creación</TableHeaderCell>
                            <TableHeaderCell>Fecha de Pago</TableHeaderCell>
                            <TableHeaderCell>Total</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {map(paginatedPromos, (data, i) => (
                            <TableRow key={i}>
                                <TableCell>{data.cardcode}</TableCell>
                                <TableCell>{data.nombre}</TableCell>
                                <TableCell>{data.correo}</TableCell>
                                <TableCell>{data.transactionid}</TableCell>
                                <TableCell>{data.itemcode}</TableCell>
                                <TableCell>{data.totalproducts}</TableCell>
                                <TableCell>{data.promotionalcodesid}</TableCell>
                                <TableCell>${data.promotionalcodeamount}</TableCell>
                                <TableCell>{data.creacion}</TableCell>
                                <TableCell>{data.pago}</TableCell>
                                <TableCell>${data.totalcost}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div>
                <Pagination
                    totalPages={Math.ceil(pagination.total / pagination.limit)}
                    activePage={page}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    onPageChange={changePage}
                />
            </div>
        </>
    );
}
