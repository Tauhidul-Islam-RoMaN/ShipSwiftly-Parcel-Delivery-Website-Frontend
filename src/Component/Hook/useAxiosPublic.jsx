import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://assignment-12-server-pied.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;