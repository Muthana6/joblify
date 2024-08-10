import {useLoaderData, useParams} from 'react-router-dom';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import {FormRow, FormRowSelect} from "../components/index.jsx";
import {JOB_STATUS, JOB_TYPE} from "../../../util/constants.js";


export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`jobs/${params.id}`);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return redirect("/dashboard/all-jobs");
    }
};
export const action = async ({request, params}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        await customFetch.patch(`jobs/${params.id}`, data)
        toast.success('Job Edited ')
        return redirect("/dashboard/all-jobs")
    }catch (error) {
        toast.error(error?.response?.data?.msg);
        return redirect("/dashboard/all-jobs");
    }
};

const EditJob = () => {
    const params = useParams()
    const {job} = useLoaderData()
    console.log(job)
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title"> edit job</h4>
                <div className="form-center">
                    <FormRow type="text" name="position" defaultValue={job.position}/>
                    <FormRow type="text" name="company" defaultValue={job.company}/>
                    <FormRow type="text" name="jobLocation" labelText='job location' defaultValue={job.jobLocation}/>
                    <FormRowSelect name="jobStatus" labelText="job status" defaultValue={job.jobStatus} list={Object.values(JOB_STATUS)}/>

                    <FormRowSelect name="jobType" labelText="job type" defaultValue={job.jobType} list={Object.values(JOB_TYPE)}/>

                    <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>{isSubmitting? 'submitting' : 'submit'}</button>

                </div>
            </Form>
        </Wrapper>
    );
};

export default EditJob;
