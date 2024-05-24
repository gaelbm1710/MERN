import { ENV } from "../utils";

export class Contabilidad {
    baseApi = ENV.BASE_API;

    async getReporteKeyla(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.CONTA}?${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getReporteK() {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CONTAS}`
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getReporteTranscredito(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.CREDITO}?${pageFilter}&${limitFilter}`
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getReporteTC() {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CREDTIOSS}`
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getClientesCredito(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.CREDITOS}?${pageFilter}&${limitFilter}`
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getPagosFacturas(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.PAGOS}?${pageFilter}&${limitFilter}`
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getReportePF() {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.PAGOSF}`
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    //Filtrador de Fechas
    async getReporteKeylaFechas(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const fecha1 = params?.fecha1 ? `fecha1=${params.fecha1}` : '';
            const fecha2 = params?.fecha2 ? `fecha2=${params.fecha2}` : '';
            const fechaParams = [fecha1, fecha2].filter(Boolean).join('&');
            const url = `${this.baseApi}/${ENV.API_ROUTES.CONTAR}?${fechaParams}&${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    //Exportar Archivos
    async exportReporteKeyla() {
        try {
            const url = `https://kaapa-backend.azurewebsites.net/api/v1/${ENV.API_ROUTES.ECONTA}`;
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
            a.download = 'ReporteKeyla.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(urlBlob);
        } catch (error) {
            console.error('Error al exportar el reporte:', error);
        }
    }

    async exportReporteTransaccCredito() {
        try {
            const url = `https://kaapa-backend.azurewebsites.net/api/v1/${ENV.API_ROUTES.ECREDITO}`;
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
            a.download = 'ReporteTransaccionesC.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(urlBlob);
        } catch (error) {
            console.error('Error al exportar el reporte:', error);
        }
    }

    async exportReportePagosFacturas() {
        try {
            const url = `https://kaapa-backend.azurewebsites.net/api/v1/${ENV.API_ROUTES.EPAGOS}`;
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
            a.download = 'ReportePagoFacturas.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(urlBlob);
        } catch (error) {
            console.error('Error al exportar el reporte:', error);
        }
    }


}