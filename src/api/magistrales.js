import { ENV } from "../utils";

export class Mag {
    baseApi = ENV.BASE_API;
    //Investigación y Desarrollo
    async getMag(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAG}?${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async createMag(accessToken, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAG}`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateMag(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAG}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateMagi(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAGI}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateMagis(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAGIS}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteMag(accessToken, idMag) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAG}/${idMag}`
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async cancelarMag(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.CANCELAR}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    // OPERACIONES
    async getMagOpe(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.OPE}?${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async createMagOpe(accessToken, data) {
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
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result
        } catch (error) {
            throw error;
        }
    }
    async updateMagOpe(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.OPE}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async deleteMagOpe(accessToken, idMag) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.OPE}/${idMag}`
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }



    //COMERCIAL o MARCELA :D
    async createMagCome(accessToken, data) {
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
            const result = await response.json();
            if (response.status !== 201) throw result;
            return result
        } catch (error) {
            throw error;
        }
    }
    async updateMagCome(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.COME}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async deleteMagCome(accessToken, idMag) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.COME}/${idMag}`
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getMagCome(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.OPE}?${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    //Busquedas especificas o Menus o Listas
    async getMagActividadNueva(actividad, params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const act = `actividad=${actividad || "nueva"}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAGI}?${act}&${pageFilter}&${limitFilter}`;
            //console.log(url);
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error
        }
    }

    async getMagActividadPresentacion(actividad, params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const act = `actividad=${actividad || "presentacion"}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAGI}?${act}&${pageFilter}&${limitFilter}`;
            //console.log(url);
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error
        }
    }

    async getMagActividadCambio(actividad, params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const act = `actividad=${actividad || "cambio"}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAGI}?${act}&${pageFilter}&${limitFilter}`;
            //console.log(url);
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error
        }
    }
    /*
    async getMagByAsesoryActividad(asesor, actividad, params){
        try {
            const pageFilter = `page=${params?.page||1}`;
            const limitFilter = `limit=${params?.limit||10}`;
            const email = `asesor=${asesor || ""}`;
            const actividadFilter = `actividad=${actividad || "presentacion"}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAGS}?actividad=${actividadFilter}&asesor=${email}&page=${pageFilter}&limit=${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error
        }
    }
    */
    async getMagByNueva(asesor, params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const email = `asesor=${asesor || ""}`;
            const actividad = `actividad=nueva`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAGS}?${actividad}&${email}&${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error
        }
    }

    async getMagByPresentacion(asesor, params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const email = `asesor=${asesor || ""}`;
            const actividad = `actividad=presentacion`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAGS}?${actividad}&${email}&${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error
        }
    }

    async getMagByCambioBase(asesor, params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const email = `asesor=${asesor || ""}`;
            const actividad = `actividad=cambio`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.MAGS}?${actividad}&${email}&${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error
        }
    }

    ///Save
    //INYDE
    async saveMag(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.SAVEMAG}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async saveMagi(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.SAVEMAGI}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async saveMagis(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.SAVEMAGIS}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    //OPERACIONES
    async saveMagOpe(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.SAVEOPE}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async saveMagiOpe(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.SAVEOPEI}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async saveMagisOpe(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.SAVEOPEIS}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    //GCOMERCIAL
    async saveMagCome(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.SAVECOME}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async saveMagiCome(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.SAVECOMEI}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async saveMagisCome(accessToken, idMag, MagData) {
        try {
            const data = MagData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.SAVECOMEIS}/${idMag}`
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params)
            const result = await response.json()
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }


    //Envases
    async getEnvases() {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.ENVASES}`;
            const response = await fetch(url);
            const result = await response.json();
            const envases = result.map(envase => ({
                key: envase.fieldid,
                text: envase.value,
                value: envase.value
            }))
            if (response.status !== 200) throw result;
            return envases;
        } catch (error) {
            throw error;
        }
    }
}
