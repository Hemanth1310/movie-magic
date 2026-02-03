
const apiUrl = import.meta.env.VITE_API_URL

const getImageUrl=(url:string)=>{
    return apiUrl+url
}

export default getImageUrl