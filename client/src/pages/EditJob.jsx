import {useLoaderData, useParams} from 'react-router-dom';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from "../utils/customFetch.js";
import {useFetch} from "../utils/useFetch.js";

export const loader = async ({params}) => {
    try {
        const {data} = await customFetch.get(`/jobs/${params.id}`)
        return data
    }catch (error) {
        toast.error(error?.response?.data?.msg)
        return redirect('/dashboard/all-jobs')
    }
};
export const action = async () => {
    return null;
};

const EditJob = () => {
    const params = useParams()
    const job = useLoaderData()


    return (
        <h1>EditJob Page</h1>
    );
};

export default EditJob;
