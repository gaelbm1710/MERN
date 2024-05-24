import React, { useState, useEffect } from "react";
import { Contabilidad } from "../../../api";
import { map, size } from "lodash";
import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table, Pagination, Loader, Input, Button, Dropdown } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./Omicronshoppagos.scss"; // Importa tu archivo SCSS

const contaController = new Contabilidad();

export function Omicronshoppagos() {
    const [pago, setPago] = useState([]);
    const [filteredPago, setFilteredPago] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        limit: 20,
        total: 0,
    });
    const [filters, setFilters] = useState({
        cardcode: "",
        nombre: "",
        createdate: "",
        responsedate: "",
        status: "",
        transactionid: "",
        totalcost: "",
        correo: "",
        case: ""
    });

    const statusOptions = [
        { key: 'pendiente', text: 'Pendiente', value: 'pendiente' },
        { key: 'activo', text: 'Activo', value: 'activo' }
    ];

    const formasdepagoOptions = [
        { key: 'BBVA TARJETA CREDITO/DEBITO', text: 'BBVA TARJETA CREDITO/DEBITO', value: 'BBVA TARJETA CREDITO/DEBITO' },
        { key: 'BBVA CIE INTERBANCARIO', text: 'BBVA CIE INTERBANCARIO', value: 'BBVA CIE INTERBANCARIO' },
        { key: 'BBVA SPEI BBVA', text: 'BBVA SPEI BBVA', value: 'BBVA SPEI BBVA' },
        { key: 'BBVA PRACTICAJA/SUCURSAL', text: 'BBVA PRACTICAJA/SUCURSAL', value: 'BBVA PRACTICAJA/SUCURSAL' },
        { key: 'credito', text: 'Crédito', value: 'credito' },
        { key: 'Tarjeta Débito', text: 'Tarjeta Débito', value: 'Tarjeta Débito' },
        { key: 'Tarjeta Crédito', text: 'Tarjeta Crédito', value: 'Tarjeta Crédito' },
        { key: 'Oxxo', text: 'Oxxo', value: 'Oxxo' },
        { key: 'spei', text: 'SPEI', value: 'spei' },
        { key: 'PayPal', text: 'PayPal', value: 'PayPal' }
    ];

    useEffect(() => {
        { }
        (async () => {
            try {
                const response = await contaController.getReporteK();
                const halfResponse = response.slice(0, Math.ceil(response.length / 6));
                setPago(halfResponse);
                setFilteredPago(halfResponse);
                setPagination({
                    ...pagination,
                    total: halfResponse.length,
                });
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const filtered = pago.filter(data => {
                return Object.keys(filters).every(key => {
                    if (!filters[key]) return true;
                    if (key === 'responsedate' || key === 'createdate') {
                        return new Date(data[key]).toLocaleDateString() === new Date(filters[key]).toLocaleDateString();
                    }
                    return String(data[key]).toLowerCase().includes(filters[key].toLowerCase());
                });
            });
            setFilteredPago(filtered);
            setPagination({
                ...pagination,
                total: filtered.length,
            });
            setPage(1);
        };
        applyFilters();
    }, [filters, pago]);

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
    const paginatedPagos = filteredPago.slice(startIndex, endIndex);

    if (!pago) return <h1>Error al traer la información</h1>;
    if (size(pago) === 0) return <Loader active inline="centered" />;

    return (
        <>
            <div className="title">
                <h1>Pagos en OmicronShop</h1>
            </div>
            <div className="export-button">
                <Button value="exportar" primary onClick={contaController.exportReporteKeyla}>Exportar</Button>
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
                    <span>Creación: <DatePicker selected={filters.createdate} onChange={date => handleDateChange(date, 'createdate')} dateFormat="yyyy/MM/dd" showIcon isClearable /></span>
                </div>
                <div className="filter-item">
                    <span>Fecha de Pago: <DatePicker selected={filters.responsedate} onChange={date => handleDateChange(date, 'responsedate')} dateFormat="yyyy/MM/dd" showIcon isClearable /></span>
                </div>
                <div className="filter-item">
                    <span>DXP: <Input name="transactionid" value={filters.transactionid} onChange={handleFilterChange} placeholder="Filtrar por DXP" /></span>
                </div>
                <div className="filter-item">
                    <span>Total: <Input name="totalcost" value={filters.totalcost} onChange={handleFilterChange} placeholder="Filtrar por Total" /></span>
                </div>

                <div className="filter-item">
                    <span>Status: <Dropdown placeholder='Seleccionar Estatus' selection options={statusOptions} name="status" value={filters.status} onChange={handleFilterChange} clearable /></span>
                </div>
                <div className="filter-item">
                    <span>Forma de pago: <Dropdown placeholder='Seleccionar Forma de Pago' selection options={formasdepagoOptions} name="case" value={filters.case} onChange={handleFilterChange} clearable /></span>
                </div>
            </div>
            <div>
                <Table celled>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Cardcode</TableHeaderCell>
                            <TableHeaderCell>Cliente</TableHeaderCell>
                            <TableHeaderCell>Creación</TableHeaderCell>
                            <TableHeaderCell>Fecha de Pago</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>DXP</TableHeaderCell>
                            <TableHeaderCell>Total</TableHeaderCell>
                            <TableHeaderCell>Correo</TableHeaderCell>
                            <TableHeaderCell>Forma de pago</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {map(paginatedPagos, (data, i) => (
                            <TableRow key={i}>
                                <TableCell>{data.cardcode}</TableCell>
                                <TableCell>{data.nombre}</TableCell>
                                <TableCell>{data.createdate}</TableCell>
                                <TableCell>{data.responsedate}</TableCell>
                                <TableCell>{data.status}</TableCell>
                                <TableCell>{data.transactionid}</TableCell>
                                <TableCell>${data.totalcost}</TableCell>
                                <TableCell>{data.correo}</TableCell>
                                <TableCell>{data.case}</TableCell>
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
