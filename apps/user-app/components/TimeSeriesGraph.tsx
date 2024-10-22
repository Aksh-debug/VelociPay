"use client"
import { useEffect, useState } from "react";
import {Line} from "react-chartjs-2";
import {motion} from "framer-motion";

import 'chart.js/auto'; 
import 'chartjs-adapter-moment';

const Graph = () => {
    const [transferData, setTransferData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/user/transfers');
            const data = await res.json();
            setTransferData(data);
        }
        fetchData();
    }, []);
    console.log(transferData)

    if(!transferData) return 

    const chartData = {
        labels: transferData.map((transfer: { amount: number, timeStamp: Date }) => new Date(transfer.timeStamp).toLocaleDateString()),
        datasets: [
            {
                label: "Transfer Amounts",
                data: transferData.map((transfer: { amount: number, timeStamp: Date }) => transfer.amount),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension:0.4
            }
        ]
    }

    // const chartOptions={
    //    type:"",
    //    options:{
    //     animations:{
    //         duration:1,
    //         easing:'linear',
    //         from:0,
    //         to:1
    //     }
    //    }
    // }
    const options = {
        responsive: true,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Line Chart Amount v/s Date',
          },
        },
        scales: {
          y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
          },
          y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };

      const chartVariants={
        hidden:{
            opacity:0,
            rotateX:45
            // scale:0.8
        },
        visible:{
            opacity:1,
            rotateX:0,
            // scale:1,
            transition:{
                type:"spring",
                duration:3,
                stiffness:20
            }
        }
      }

    return (
        <motion.div style={{perspective:1200}} initial="hidden" animate="visible" variants={chartVariants} className="border-[1.5px] border-black shadow-black shadow-xl bg-purple-200 rounded-md my-3">
            <Line height={500} width={1000} data={chartData} options={options}/>
        </motion.div>
    )
};

export default Graph;