import React, {useState, useEffect } from "react"
import { data } from "../datamanager/DataManager";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line
  } from 'recharts';


export const Charts = () => {
    const [benchmarkData, setBenchmarkData] = useState({})

    const [averageSleep, setAverageSleep] = useState(0)

    const [sleepVsQuality, setSleepVsQuality] = useState([])

    const getChartData = () => {
        data.get('chartdata?datatype=benchmarks')
        .then(data => setBenchmarkData(data))
        data.get('chartdata?datatype=sleep')
        .then(data => setAverageSleep(data))
        data.get('chartdata?datatype=sleepvsquality')
        .then(data => setSleepVsQuality(data))
    }

    useEffect(() => {
        getChartData()
    }, [])

    
    const data01 = [
        { x: 10, y: 30 },
        { x: 30, y: 200 },
        { x: 45, y: 100 },
        { x: 50, y: 400 },
        { x: 70, y: 150 },
        { x: 100, y: 250 },
      ];
      const data02 = [
        { x: 30, y: 20 },
        { x: 50, y: 180 },
        { x: 75, y: 240 },
        { x: 100, y: 100 },
        { x: 120, y: 190 },
      ];
    
    //   const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}]

    const round = (value, decimals) => {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      }

    return (
        <article className="charts">
        <h1 className="charts">See Your Data</h1>
        <div>
            <h2>Sleep</h2>
            <div>In the last month, you have averaged {round(averageSleep, 2)} hours of sleep before a workout.</div>
        </div>
        
        
        <h3>Benchmark Progress</h3>
        {/* <ResponsiveContainer width="100%" height="100%"> */}
        <ScatterChart
          width={500}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <ZAxis type="number" range={[100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          {/* {Object.keys(benchmarkData).map(benchmark => 
              <Scatter name={benchmark} data={benchmarkData[benchmark]} fill="#8884d8" line shape="cross" />
          )} */}
          <Scatter name="A school" data={data01} fill="#8884d8" line shape="cross" />
          <Scatter name="B school" data={data02} fill="#82ca9d" line shape="diamond" />
        </ScatterChart>
      {/* </ResponsiveContainer> */}

    <div>
    <h3>Sleep vs Workout Quality</h3>
      <ScatterChart
          width={500}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit=" hours" />
          <YAxis type="number" dataKey="y" name="weight" unit="" />
          <ZAxis type="number" range={[100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          
          <Scatter name="X: Hours of Sleep,     Y: Session Quality" data={sleepVsQuality} fill="#8884d8" line shape="cross" />
        </ScatterChart>
        </div>

        <div>
    <h3>Workout Quality vs Time of Day</h3>
      <ScatterChart
          width={500}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <ZAxis type="number" range={[100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          
          <Scatter name="A school" data={data01} fill="#8884d8" line shape="cross" />
          <Scatter name="B school" data={data02} fill="#82ca9d" line shape="diamond" />
        </ScatterChart>
        </div>
        </article>
    )
}