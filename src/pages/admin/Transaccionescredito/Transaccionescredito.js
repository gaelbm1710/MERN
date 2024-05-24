import React, { useState, useEffect } from 'react'
import { Contabilidad } from "../../../api";
import { map, size } from "lodash";
import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table, Pagination, Loader, Button, Input, Dropdown } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
const contaController = new Contabilidad();


export function Transaccionescredito() {
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
        pedido: "",
        fechacreacion: "",
        estado: "",
        fechapago: "",
        total: "",
    });

    const statusOptions = [
        { key: 'pendiente', text: 'Pendiente', value: 'pendiente' },
        { key: 'pagada', text: 'Pagada', value: 'pagada' }
    ];

    useEffect(() => {
        { }
        (async () => {
            try {
                const response = await contaController.getReporteTC();
                const halfResponse = response.slice(0, Math.ceil(response.length / 5.8));
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
                    if (key === 'fechapago' || key === 'fechacreacion') {
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
                <h1>Transacciones de Crédito</h1>
            </div>
            <div className="export-button">
                <Button value="exportar" primary onClick={contaController.exportReporteTransaccCredito}>Exportar</Button>
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
                    <span>Creación: <DatePicker selected={filters.fechacreacion} onChange={date => handleDateChange(date, 'fechacreacion')} dateFormat="yyyy/MM/dd" showIcon isClearable /></span>
                </div>
                <div className="filter-item">
                    <span>Fecha de Pago: <DatePicker selected={filters.fechapago} onChange={date => handleDateChange(date, 'fechapago')} dateFormat="yyyy/MM/dd" showIcon isClearable /></span>
                </div>
                <div className="filter-item">
                    <span>DXP: <Input name="pedido" value={filters.pedido} onChange={handleFilterChange} placeholder="Filtrar por DXP" /></span>
                </div>
                <div className="filter-item">
                    <span>Total: <Input name="total" value={filters.total} onChange={handleFilterChange} placeholder="Filtrar por Total" /></span>
                </div>
                <div className="filter-item">
                    <span>Status: <Dropdown placeholder='Seleccionar Estatus' selection options={statusOptions} name="estado" value={filters.estado} onChange={handleFilterChange} clearable /></span>
                </div>
            </div>
            <div>
                <Table celled>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Cardcode</TableHeaderCell>
                            <TableHeaderCell>Cliente</TableHeaderCell>
                            <TableHeaderCell>Pedido</TableHeaderCell>
                            <TableHeaderCell>Fecha de Creación</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>Fecha de Pago</TableHeaderCell>
                            <TableHeaderCell>Total</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {map(paginatedPagos, (data, i) => (
                            <TableRow key={i}>
                                <TableCell>{data.cardcode}</TableCell>
                                <TableCell>{data.nombre}</TableCell>
                                <TableCell>{data.pedido}</TableCell>
                                <TableCell>{data.fechacreacion}</TableCell>
                                <TableCell>{data.estado}</TableCell>
                                <TableCell>{data.fechapago}</TableCell>
                                <TableCell>${data.total}</TableCell>
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
