import {
    ResponsiveContainer,
    AreaChart as RechartsAreaChart,  // Renaming to avoid conflict
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';



const AreaChart = ({data}) => {
    return (

        <ResponsiveContainer width={`100%`} height={300} >
            <RechartsAreaChart data={data} margin={{top: 50}}>
                <CartesianGrid strokeDasharray={`3 3`}/>
                <XAxis dataKey={`date`}/>
                <YAxis allowDecimals={false}/>
                <Tooltip/>
                <Area type={`monotone`} dataKey={`count`} stroke={`#2cb1bc`} fill={`#bef8fd`}/>
            </RechartsAreaChart>
        </ResponsiveContainer>



    );
};

export default AreaChart;
