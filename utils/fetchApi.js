import axios from 'axios';
export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async(url)=>{
    const response = await axios.get(
        (url),  
        {
            headers:{
                'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
                'X-RapidAPI-Key': '924add2a7dmsh2ce92099e2b40e6p131347jsn1f55a9926f0c'
            }
        },
    );
    return response.data
}