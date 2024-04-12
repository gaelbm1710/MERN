import { ENV } from "../utils";

export class Soporte{
    baseApi = ENV.BASE_API;
    async getSoporte(params){
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.SOPORTE}?${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async createTicket(accessToken, data){
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key)=>{
                formData.append(key,data[key]);
            })
            if(data.file){
                formData.append("documentos", data.file);
            }
            const url = `${this.baseApi}/${ENV.API_ROUTES.SOPORTE}`
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData,
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async updateTicket(accessToken, idTicket, ticketData){
        try {
            const data = ticketData;
            const formData = new FormData();
            Object.keys(data).forEach((key)=>{
                formData.append(key,data[key]);
            });
            if(data.file){
                formData.append("documentos", data.file);
            }
            const url = `${this.baseApi}/${ENV.API_ROUTES.SOPORTE}/${idTicket}`
            const params ={
                method: "PATCH",
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
}