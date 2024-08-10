import links from "../utils/links.jsx";
import {NavLink} from "react-router-dom";
import {useDashboardContext} from "../pages/DashboardLayout.jsx";


const NavLinks = ({isBigSidebar}) => {
    const {user, toggleSidebar} = useDashboardContext()
    return(
        <div className="nav-links">
            {links.map((link) => {
                const {text, path, icon} = link
                const { role } = user;
                if (role !== 'admin' && path === 'admin') return;
                return (
                    <NavLink to={path}
                             key={text}
                             onClick={isBigSidebar ? null : toggleSidebar}
                             end
                             className="nav-link">
                        <span className='icon'> {icon} </span>
                        {text}
                    </NavLink>
                )
            })}
        </div>

    )
}

export default NavLinks;
