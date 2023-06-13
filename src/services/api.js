import axios from "axios";

export const APIHeaders ={
    Accept:"*",
    // "Content-type":"application/json",
    'Content-type': 'multipart/form-data',
    Autorization: "token"
};

export const  API = axios.create({
    baseURL:"http://localhost:5800",
    headers: APIHeaders,
})