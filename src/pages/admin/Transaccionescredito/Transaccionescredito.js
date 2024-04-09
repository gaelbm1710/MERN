import React, {useState, useEffect} from 'react'
import { Contabilidad } from "../../../api";
import {map, size} from "lodash";
import {TableRow,TableHeaderCell,TableHeader, TableCell,TableBody, Table, TableFooter, Pagination, Loader} from "semantic-ui-react";

const contaController = new Contabilidad();


export function Transaccionescredito() {
    const [pago, setPago] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([])
    useEffect(() => {
      (async ()=>{
       try {
           const response = await contaController.getReporteTranscredito({page, limit: 15});
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
       <h1>Transacciones de Crédito</h1>
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
                       {map(pago,(data, i)=>(
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
