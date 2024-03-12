import {ENV} from "../utils";

export class Mag{
    baseApi = ENV.BASE_API;
<<<<<<< HEAD
    async getMag(params){
=======
    //Investigación y Desarrollo
    async getMag(page=1,limit=10){
>>>>>>> f94437d98d933f4479cb15ee6072b71a847a8e55
        try {
            const pageFilter = `page=${params?.page||1}`;
            const limitFilter = `limit=${params?.limit||10}`;
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
    // OPERACIONES
    async getMagOpe(params){
        try {
            const pageFilter = `page=${params?.page||1}`;
            const limitFilter = `limit=${params?.limit||10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.OPE}?${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result= await response.json()
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async createMagOpe(accessToken, data){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.OPE}`;
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
    async updateMagOpe(accessToken, idMag, MagData){
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key)=>{
                formData.append(key,data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.OPE}/${idMag}`
            const params={
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
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
    async deleteMagOpe(accessToken, idMag){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.OPE}/${idMag}`
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


    //COMERCIAL o MARCELA :D
    async createMagCome(accessToken, data){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.COME}`;
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
    async updateMagCome(accessToken, idMag, MagData){
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key)=>{
                formData.append(key,data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.COME}/${idMag}`
            const params={
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
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
    async deleteMagCome(accessToken, idMag){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.COME}/${idMag}`
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
    async getMagCome(params){
        try {
            const pageFilter = `page=${params?.page||1}`;
            const limitFilter = `limit=${params?.limit||10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.OPE}?${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result= await response.json()
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

}