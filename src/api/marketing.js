import { ENV } from "../utils";

export class Marketing{
    baseApi = ENV.BASE_API;

    async ConsultaFacturas(){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MARKFACTURAS}`;
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getReportePromos(){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MARKPROMOS}`;
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getReporteCatPromos(params){
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.MARKCATPROMOS}?${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    //Exportar Archivos
    async ExportarConsultaFacturas(){
        try {
            const url = `https://kaapa-backend.azurewebsites.net/api/v1/${ENV.API_ROUTES.EMARKFACTURAS}`;
            const response = await fetch(url);
            console.log(response.status);
            console.log(response);
            if (response.status !== 200) {
                const result = await response.json();
                throw new Error(result.msg || 'Error al exportar el reporte');
            }
            const blob = await response.blob();
            console.log('Blob type:', blob.type);
            if (blob.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                throw new Error('El servidor no devolvió un archivo Excel válido');
            }
            const urlBlob = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = urlBlob;
            a.download = 'Facturas.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(urlBlob);
        } catch (error) {
            console.error('Error al exportar el reporte:', error);
        }
    }

    async exportReportePromos(){
        try {
            const url = `https://kaapa-backend.azurewebsites.net/api/v1/${ENV.API_ROUTES.EMARKPROMOS}`;
            const response = await fetch(url);
            console.log(response.status);
            console.log(response);
            if (response.status !== 200) {
                const result = await response.json();
                throw new Error(result.msg || 'Error al exportar el reporte');
            }
            const blob = await response.blob();
            console.log('Blob type:', blob.type);
            if (blob.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                throw new Error('El servidor no devolvió un archivo Excel válido');
            }
            const urlBlob = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = urlBlob;
            a.download = 'ReportePromociones.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(urlBlob);
        } catch (error) {
            console.error('Error al exportar el reporte:', error);
        }
    }
}