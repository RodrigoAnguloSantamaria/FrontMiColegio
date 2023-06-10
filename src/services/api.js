import axios from "axios";

export const APIHeaders ={
    Accept:"application/json",
    "Content-type":"application/json",
    Autorization: "token"
};

export const  API = axios.create({
    baseURL:"http://localhost:3000",
    headers: APIHeaders,
})