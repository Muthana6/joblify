import {useFetch} from "../utils/useFetch.js";

const Admin = () => {

const {data} = useFetch('v1/jobs')
    console.log(data)

    return (
        <h1>
            Admin
        </h1>
    );
};

export default Admin;
