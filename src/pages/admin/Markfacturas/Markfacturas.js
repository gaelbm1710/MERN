import React, { useState, useEffect } from "react";
import { Marketing } from "../../../api/marketing";
import { map, size } from "lodash";
import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table, Pagination, Loader, Input, Button, Dropdown  } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./Markfacturas.scss"

const SAPController = new Marketing();

export function Markfacturas() {
    const [promo, setPromo] = useState([]);
    const [filteredPromo, setFilteredPromo] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        limit: 20,
        total: 0,
    });
    const [filters, setFilters] = useState({
        CardCode: "",
        DocNum: "",
        Fecha_Factura: "",
        U_Pedido_DXP: ""
    });

    useEffect(() => {
        { }
        (async () => {
            try {
                const response = await SAPController.ConsultaFacturas();
                const halfResponse = response.slice(0, Math.ceil(response.length / 6));
                setPromo(halfResponse);
                setFilteredPromo(halfResponse);
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
            const filtered = promo.filter(data => {
                return Object.keys(filters).every(key => {
                    if (!filters[key]) return true;
                    if (key === 'Fecha_Factura') {
                        // Compare dates by converting them to UTC date strings for precise comparison
                        const filterDate = filters[key].toISOString().slice(0, 10); // yyyy-mm-dd format
                        const dataDate = new Date(data[key]).toISOString().slice(0, 10); // yyyy-mm-dd format
                        return filterDate === dataDate;
                    }
                    return String(data[key]).toLowerCase().includes(filters[key].toLowerCase());
                });
            });
            setFilteredPromo(filtered);
            setPagination({
                ...pagination,
                total: filtered.length,
            });
            setPage(1);
        };
        applyFilters();
    }, [filters, promo]);

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

    if (!promo) return <h1> Error al traer la información</h1>;
    if (size(promo) === 0) return <Loader active inline="centered" />;

    return (
        <>
            <div className="title">
                <h1>Facturas de SAP</h1>
            </div>
            <div className="export-button">
                <Button value="exportar" primary onClick={SAPController.ExportarConsultaFacturas}>Exportar</Button>
            </div>
            <div className="filters">
                <h2>Filtros</h2>
            </div>
            <div className="filters-container">
            <div className="filter-item">
                    <span>CardCode: <Input name="CardCode" value={filters.CardCode} onChange={handleFilterChange} placeholder="Filtrar por CardCode" /></span>
                </div>
                <div className="filter-item">
                    <span>Numero Factura: <Input name="DocNum" value={filters.DocNum} onChange={handleFilterChange} placeholder="Filtrar por numero de factura" /></span>
                </div>
                <div className="filter-item">
                    <span>Fecha Factura: <DatePicker selected={filters.Fecha_Factura} onChange={date => handleDateChange(date, 'Fecha_Factura')} dateFormat="yyyy/MM/dd" showIcon isClearable /></span>
                </div>
                <div className="filter-item">
                    <span>DXP: <Input name="U_Pedido_DXP" value={filters.U_Pedido_DXP} onChange={handleFilterChange} placeholder="Filtrar por DXP" /></span>
                </div>
            </div>
            <br />
            <div className="tabla-reporte">
                <Table celled>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>CardCode</TableHeaderCell>
                            <TableHeaderCell>Numero Factura</TableHeaderCell>
                            <TableHeaderCell>Fecha Factura</TableHeaderCell>
                            <TableHeaderCell>DXP</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {map(paginatedPromos, (data, i) => (
                            <TableRow key={i}>
                                <TableCell>{data.CardCode}</TableCell>
                                <TableCell>{data.DocNum}</TableCell>
                                <TableCell>{data.Fecha_Factura}</TableCell>
                                <TableCell>{data.U_Pedido_DXP}</TableCell>
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