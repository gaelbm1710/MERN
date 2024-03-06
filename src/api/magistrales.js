import {ENV} from "../utils";

export class Mag{
    baseApi = ENV.BASE_API;
    async getMag(page=1,limit=10){
        try {
            const pageFilter = `page=${page}`;
            const limitFilter = `limit=${limit}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAG}?${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result= await response.json()
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async createMag(accessToken, data){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAG}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params);
            const result= await response.json()
            if(response.status !== 200) throw result;
            return result
        } catch (error) {
            throw error;
        }
    }
    async updateMag(accessToken, idMag, data){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAG}/${idMag}`
            const params={
                method: "PATCH",
                headers:{
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async deleteMag(accessToken, idMag){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAG}/${idMag}`
            const params={
                method: "DELETE",
                headers:{
                    Authorization: `Bearer ${accessToken}`
                },
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    
}