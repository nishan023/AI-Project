import axios from "axios";

export const commonRequest = async(method, url, body, header)=>{
    const config={
        method: method,
        url: url,
        body: body,
        headers: header? header: {
            "Content-Type": "application/json",
        },

        data: body? body: "",
    };


    try{
        const response = await axios(config);
        return response.data;
    }catch(error)
    {
        return error.response ? error.response.data: error.message;
    }
}