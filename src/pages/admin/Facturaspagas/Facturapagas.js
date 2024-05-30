import React, { useState, useEffect } from "react";
import { Contabilidad } from "../../../api";
import { map, size } from "lodash";
import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table, Pagination, Loader, Input, Button, Dropdown } from "semantic-ui-react";
import DatePicker from 'react-datepicker';

const contaController = new Contabilidad();

export function Facturapagas() {
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
        fecha_creacion: "",
        fecha_pago: "",
        status: "",
        factura: "",
        total_factura: "",
        correo: "",
        metodo_pago: ""
    });

    const statusOptions = [
        { key: 'pendiente', text: 'Pendiente', value: 'pendiente' },
        { key: 'En validación', text: 'En validación', value: 'En validación' }
    ];

    const formasdepagoOptions = [
        { key: 'BBVA TARJETA CREDITO/DEBITO', text: 'BBVA TARJETA CREDITO/DEBITO', value: 'BBVA TARJETA CREDITO/DEBITO' },
        { key: 'BBVA CIE INTERBANCARIO', text: 'BBVA CIE INTERBANCARIO', value: 'BBVA CIE INTERBANCARIO' },
        { key: 'BBVA SPEI BBVA', text: 'BBVA SPEI BBVA', value: 'BBVA SPEI BBVA' },
        { key: 'BBVA PRACTICAJA/SUCURSAL', text: 'BBVA PRACTICAJA/SUCURSAL', value: 'BBVA PRACTICAJA/SUCURSAL' },
        { key: 'Tarjeta Débito', text: 'Tarjeta Débito', value: 'Tarjeta Débito' },
        { key: 'Tarjeta Crédito', text: 'Tarjeta Crédito', value: 'Tarjeta Crédito' },
        { key: 'Oxxo', text: 'Oxxo', value: 'Oxxo' },
        { key: 'spei', text: 'SPEI', value: 'spei' },
        { key: 'PayPal', text: 'PayPal', value: 'PayPal' },
        { key: 'Revisar en SAP', text: 'Revisar en SAP', value: 'Revisar en SAP' },
    ];

    useEffect(() => {
        { }
        (async () => {
            try {
                const response = await contaController.getReportePF();
                const halfResponse = response.slice(0, Math.ceil(response.length / 2.5));
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
                    if (key === 'fecha_pago' || key === 'fecha_creacion') {
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
                <h1>Pagos de Facturas</h1>
            </div>
            <div className="export-button">
                <Button value="exportar" primary onClick={contaController.exportReportePagosFacturas}>Exportar</Button>
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
                    <span>Fecha de Creación: <DatePicker selected={filters.fecha_creacion} onChange={date => handleDateChange(date, 'fecha_creacion')} dateFormat="yyyy/MM/dd" showIcon isClearable /></span>
                </div>
                <div className="filter-item">
                    <span>Fecha de Pago: <DatePicker selected={filters.fecha_pago} onChange={date => handleDateChange(date, 'fecha_pago')} dateFormat="yyyy/MM/dd" showIcon isClearable /></span>
                </div>
                <div className="filter-item">
                    <span>Factura: <Input name="factura" value={filters.factura} onChange={handleFilterChange} placeholder="Filtrar por Factura" /></span>
                </div>
                <div className="filter-item">
                    <span>Total de Factura: <Input name="total_factura" value={filters.total_factura} onChange={handleFilterChange} placeholder="Filtrar por Total" /></span>
                </div>

                <div className="filter-item">
                    <span>Status: <Dropdown placeholder='Seleccionar Estatus' selection options={statusOptions} name="status" value={filters.status} onChange={handleFilterChange} clearable /></span>
                </div>
                <div className="filter-item">
                    <span>Forma de pago: <Dropdown placeholder='Seleccionar Forma de Pago' selection options={formasdepagoOptions} name="metodo_pago" value={filters.metodo_pago} onChange={handleFilterChange} clearable /></span>
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
                            <TableHeaderCell>Factura</TableHeaderCell>
                            <TableHeaderCell>Total de Factura</TableHeaderCell>
                            <TableHeaderCell>Correo</TableHeaderCell>
                            <TableHeaderCell>Forma de pago</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {map(paginatedPagos, (data, i) => (
                            <TableRow key={i}>
                                <TableCell>{data.cardcode}</TableCell>
                                <TableCell>{data.nombre}</TableCell>
                                <TableCell>{data.fecha_creacion}</TableCell>
                                <TableCell>{data.fecha_pago}</TableCell>
                                <TableCell>{data.status}</TableCell>
                                <TableCell>{data.factura}</TableCell>
                                <TableCell>${data.total_factura}</TableCell>
                                <TableCell>{data.correo}</TableCell>
                                <TableCell>{data.metodo_pago}</TableCell>
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
    )
}
