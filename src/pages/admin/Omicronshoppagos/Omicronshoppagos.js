import React, {useState, useEffect} from "react";
import { Contabilidad } from "../../../api";
import {map, size} from "lodash";
import {TableRow,TableHeaderCell,TableHeader, TableCell,TableBody, Table, Pagination, Loader} from "semantic-ui-react";

const contaController = new Contabilidad();

export function Omicronshoppagos(){
     const [pago, setPago] = useState([]);
     const [page, setPage] = useState(1);
     const [pagination, setPagination] = useState([])
     useEffect(() => {
       (async ()=>{
        try {
            const response = await contaController.getReporteKeyla({page, limit: 15});
            setPago(response)
            if(response && typeof response.page === 'number' && !isNaN(response.page)){
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

     
     
     const changePage=(_,data)=>{
        setPage(data.activePage);
        console.log("CLICK!!!!");
      }
      
      if(!pago) return <h1>Error al traer la información</h1>
      if(size(pago)===0) return <Loader active inline="centered"/>

    return(
        <>
        <h1>Pagos en OmicronShop</h1>
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
                        {map(pago,(data, i)=>(
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
                totalPages={isNaN(pagination.total) ? '40' : String(pagination.total)}
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