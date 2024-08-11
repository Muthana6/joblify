import {FaBug, FaCalendarCheck, FaSuitcaseRolling} from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer.js";
import StatItem from "./StatItem.jsx";

const StatsContainer = ({defaultStats}) => {
    const stats = [
        {title: 'pending application',
        count: defaultStats?.pending || 0,
            icon: <FaSuitcaseRolling/>,
            color:'#f59e0b',
            bcg: '#fef3c7'
        },
        {title: 'interview scheduled',
            count: defaultStats?.interview || 0,
            icon: <FaCalendarCheck/>,
            color:'#647acb',
            bcg: '#e0e8f9'
        },
        {title: 'jobs declined',
            count: defaultStats?.declined || 0,
            icon: <FaBug/>,
            color:'#d66a6a',
            bcg: '#ffeeee'
        }
    ]
    return (
        <Wrapper>
            {stats.map((item) => {
                return <StatItem key={item.title} {...item} />
            })}

        </Wrapper>
    );
};

export default StatsContainer;
