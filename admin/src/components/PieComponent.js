import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function PieComponent({ data }) {
    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
            <div className='flex justify-center items-center flex-col'>
                
            </div>
            <div className='grid grid-cols-4 px-[10px] py-[10px] '>
                {data.map((item, index) => (
                    <p key={index} className='cursor-pointer font-bold'>{item.name}</p>
                ))}
            </div>
            <div className='grid grid-cols-4 px-[10px] py-[10px]'>
                {COLORS.map((color, index) => (
                    <div className='h-[30px] w-[30px]' style={{ backgroundColor: color }} key={index}></div>
                ))}
            </div>
        </div>
    );
}

export default PieComponent;
