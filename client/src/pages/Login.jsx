import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import {FormRow, Logo, SubmitBtn} from "../components/index.jsx";
import {Form, Link, redirect, useNavigate} from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
        await customFetch.post('/auth/login',data)
        toast.success('Login Success')
        return redirect('/dashboard')
    }catch (error){
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const Login = () => {
    const navigate = useNavigate()
    const loginDemoUser = async ()=> {
        const data = {
            email:"test@email.com",
            password:"password",
        }
        try {
            await customFetch.post('/auth/login',data)
            toast.success('Take a Tour')
            return navigate('/dashboard')
        }catch (error){
            toast.error(error?.response?.data?.msg)
        }
    }
  return (
      <Wrapper>
          <Form method='post' className='form'>
              <Logo/>
              <h4>Login</h4>
              {/*{error?.msg && <p style={{color:'red'}}> {error?.msg} </p>}*/}
              <p></p>
              <FormRow type='email' name='email' defaultValue='john@email.com'/>
              <FormRow type='password' name='password' defaultValue='password'/>

              <SubmitBtn/>
              <button type='button' className='btn btn-block' onClick={loginDemoUser}>Explore the app</button>

              <p>
                  Not a member ?
                  <Link to='/register'> Signup </Link>
              </p>
          </Form>
      </Wrapper>
  );
};

export default Login;
