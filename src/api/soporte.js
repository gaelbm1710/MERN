import { ENV } from "../utils";

export class Soporte {
    baseApi = ENV.BASE_API;
    async getSoporte(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.SOPORTE}?${pageFilter}&${limitFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async createTicket(accessToken, SoporteData) {
        try {
            const data = SoporteData;
            console.log(data);
            const formData = new FormData();
            console.log('FormData: ', formData);
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            if (data.file) {
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
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async createATicket(accessToken, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (key === 'fileDocumentos') {
                    formData.append('documentos', data[key]);
                } else {
                    formData.append(key, data[key]);
                }
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.ASOPORTE}`
            const params = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData,
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if (response.status !== 201) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateTicket(accessToken, idTicket, ticketData) {
        try {
            const data = ticketData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            if (data.file) {
                formData.append("documentos", data.file);
            }
            const url = `${this.baseApi}/${ENV.API_ROUTES.SOPORTE}/${idTicket}`
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async cancelTikcet(accessToken, idTicket, ticketData) {
        try {
            const data = ticketData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })
            const url = `${this.baseApi}/${ENV.API_ROUTES.CANCELSOPORTE}/${idTicket}`
            const params = {
                method: "PATCH",
                eaders: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params);
            const result = await response.json();
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async asingTicket(accessToken, idTicket, ticketData) {
        try {
            const data = ticketData;
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (key === "documentos") {
                    formData.append('documentos', data[key])
                } else {
                    formData.append(key, data[key])
                }
            });
            const url = `${this.baseApi}/${ENV.API_ROUTES.ASSOPORTE}/${idTicket}`
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };
            console.log(formData);
            const response = await fetch(url, params);
            console.log(response);
            const result = await response.json();
            console.log(result);
            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
}