import React, {useState, useEffect, useRef} from 'react';
import './App.css';
// import { MyResponsiveLine } from './graph'
import { select } from 'd3';
import { data_test, lineData } from './data'



// function App (){
//     const ref = useRef<HTMLDivElement>(null);
//     const [graphHeight, setGraphData] = useState(0);
//
//     useEffect(() =>{
//         const currentElement = ref.current;
//
//         setGraphData(500);
//
//         const documentElement = d3.select(currentElement)
//           .call(g => g.select("svg").remove())
//           .append('svg')
//           .attr('viewBox', `0,0,${width},${height}`);
//
//         const width = currentElement?.offsetWidth;
//         const height = graphHeight;
//         const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//
//         // Date parsing 용
//         const parseDate = d3.timeParse("%Y-%m-%d");
//
//         const x = d3.scaleUtc()
//             .domain(d3.extent(lineData, d => parseDate(d.d)))
//             .range([margin.left, width - margin.right])
//
//         const y = d3.scaleLinear()
//             .domain([0, d3.max(lineData, d => d.v)]).nice()
//             .range([height - margin.bottom, margin.top])
//
//         // line generator
//         const d3Type = d3.line()
//             .defined(d => !isNaN(d.v))
//             .x(d => x(parseDate(d.d)))
//             .y(d => y(d.v));
//
//         const xAxis = g => g
//             .attr("transform", `translate(0,${height - margin.bottom})`)
//             .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
//
//         documentElement.append('g')
//             .call(xAxis);
//
//         const yAxis = g => g
//             .attr("transform", `translate(${margin.left}, 0)`)
//             .call(d3.axisLeft(y));
//
//         documentElement.append('g')
//             .call(yAxis)
//             .call(g => g.select(".domain").remove());
//
//         documentElement.append('path')
//             .datum(lineData)
//             .attr('fill', 'none')
//             .attr('stroke', 'stellblue')
//             .attr('stroke-width', 1.5)
//             .attr('stroke-linejoin', 'round')
//             .attr('stroke-linecap', 'round')
//             .attr('d', d3Type)
//
//     }, [lineData])
//
//
//
//     return (
//         <>
//             <h2> Line Chart </h2>
//             <div ref={ref} style={{
//                 width: '100%',
//                 height: graphHeight
//             }}/>
//         </>
//     );
// }


function App() {
    const [data, setData] = useState([24, 30, 45, 70, 26]);
    const svgRef = useRef(null);

    useEffect(() => {

        const svg = select(svgRef.current);

        svg
            .selectAll("circle")
            .data(data)
            .join(
                (enter) => enter.append("circle"),
                (update) => update.attr("class", "updated"),
                (exit) => exit.remove()
            )
            .attr("r", (value) => value)
            .attr("cx", (value) => value * 2)
            .attr("cy", (value) => value * 2)
            .attr("stroke", 'red');

    }, [data]);

    return(
        <>
            <svg ref={svgRef}></svg>
            <button onClick={() => {setData(data.map(el => el + 5))}}>increase + 5 </button>
            <button onClick={() => {setData(data.filter(el => el > 35))}}> filter circle r should gt 35</button>
        </>
    )
}






export default App;
