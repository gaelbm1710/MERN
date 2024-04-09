import {ENV} from "../utils";

export class Contabilidad{
    baseApi=ENV.BASE_API;

    async getReporteKeyla(params){
        try {
             const pageFilter = `page=${params?.page||1}`;
            const limitFilter = `limit=${params?.limit||10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.CONTA}?${pageFilter}&${limitFilter}`
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getReporteK(){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CONTAS}`
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getReporteTranscredito(params){
        try {
             const pageFilter = `page=${params?.page||1}`;
            const limitFilter = `limit=${params?.limit||10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.CREDITO}?${pageFilter}&${limitFilter}`
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getClientesCredito (params){
        try {
             const pageFilter = `page=${params?.page||1}`;
            const limitFilter = `limit=${params?.limit||10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.CREDITOS}?${pageFilter}&${limitFilter}`
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getPagosFacturas (params){
        try {
             const pageFilter = `page=${params?.page||1}`;
            const limitFilter = `limit=${params?.limit||10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.PAGOS}?${pageFilter}&${limitFilter}`
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
}