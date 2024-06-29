import React, { useState, useEffect } from "react";
import { Marketing } from "../../../api/marketing";
import { map, size } from "lodash";
import {TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table, Pagination, Loader} from "semantic-ui-react";

const categoriapromocionescontroller = new Marketing();

export function MarkCatPromos() {
    const [promo, setPromo] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await categoriapromocionescontroller.getReporteCatPromos({ page, limit: 10 });
                setPromo(response)
                if (response && typeof response.promo === 'number' && !isNaN(response.page)) {
                    setPagination({
                        limit: response.limit,
                        page: response.page,
                        pages: response.pages,
                        total: response.totalPages,
                    });
                }
            } catch (error) {
                console.error(error)
            }
        })()
    }, [page])

    const changePage = (_, data) => {
        setPage(data.activePage);
        console.log("CLICK!!!!");
    }

    if (!promo) return <h1>Error al traer la información</h1>
    if (size(promo) === 0) return <Loader active inline="centered" />

    return (
        <>
            <h1>Información de Códigos Promocionales</h1>
            <div>
                <Table celled>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Id</TableHeaderCell>
                            <TableHeaderCell>Codigo</TableHeaderCell>
                            <TableHeaderCell>Tipo de descuento</TableHeaderCell>
                            <TableHeaderCell>Mínimo de compra</TableHeaderCell>
                            <TableHeaderCell>Descuento</TableHeaderCell>
                            <TableHeaderCell>Estado</TableHeaderCell>
                            <TableHeaderCell>Fecha de Inicio</TableHeaderCell>
                            <TableHeaderCell>Fecha de Fin</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {map(promo,(data, i)=>(
                            <TableRow key={i}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.code}</TableCell>
                                <TableCell>{data.tipo_promocion}</TableCell>
                                <TableCell>{data.tipo_descuento}</TableCell>
                                <TableCell>{data.Descuento}</TableCell>
                                <TableCell>{data.Estado}</TableCell>
                                <TableCell>{data.Fecha_Inicio}</TableCell>
                                <TableCell>{data.Fecha_Fin}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div>
                <Pagination
                totalPages={isNaN(pagination.total) ? '18' : String(pagination.total)}
                defaultActivePage={isNaN(pagination.page) ? '1' : String(pagination.page)}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                onPageChange={changePage}
                />
            </div>
        </>
    )
}