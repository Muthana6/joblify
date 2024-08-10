import {Outlet, redirect, useLoaderData, useNavigate} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard.js";
import {BigSidebar, Navbar, SmallSidebar} from "../components/index.jsx";
import {createContext, useContext, useState} from "react";
import PropTypes from 'prop-types';
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
import axios from "axios";


export const loader = async ()=> {
    try {
        const {data} = await customFetch.get('users/current-user')
        return data
    }catch (error) {
        return redirect('/')
    }
}

const DashboardContext = createContext()
const DashboardLayout = ({isDarkThemeEnabled}) => {
    const {user} = useLoaderData()
    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)
    const navigate = useNavigate()

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme)
        localStorage.setItem('darkTheme', newDarkTheme)
    }

    const toggleSidebar = ()=> {
        setShowSidebar(!showSidebar);
        console.log(showSidebar)
    }

    const logoutUser = async ()=> {
        navigate('/')
        await customFetch.get('/auth/logout')
        toast.success('logging out...')
    }

    return (
        <DashboardContext.Provider
            value={{user, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser, showSidebar}}>
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar/>
                    <BigSidebar/>
                    <div>
                        <Navbar/>
                        <div className='dashboard-page'>
                            <Outlet context={{user}}/>
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
);
};


DashboardLayout.propTypes = {
    isDarkThemeEnabled: PropTypes.bool,
};
export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout;
