// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// const ECGChart = () => {
//     const chartRef = useRef(null);

//     useEffect(() => {
//       // D3 code for ECG chart
//       const svg = d3.select(chartRef.current).append('svg').attr('width', 800).attr('height', 400);
//       const xScale = d3.scaleLinear().domain([0, 10]).range([0, 1000]);
//       const yScale = d3.scaleLinear().domain([-1, 1]).range([400, 0]);

//       svg.append('g').attr('class', 'x-axis').attr('transform', 'translate(0, 400)').call(d3.axisBottom(xScale));
//       svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

//       const line = svg.append('path').attr('class', 'ecg-line');

//       const data = d3.range(0, 10, 0.1).map((d) => ({ x: d, y: Math.sin(d) }));

//       function updateChart() {
//         line.datum(data).attr('d', d3.line().x((d) => xScale(d.x)).y((d) => yScale(d.y)).curve(d3.curveLinear));
//       }

//       updateChart(); // Initial rendering

//       // Animation
//       setInterval(() => {
//         data.push({ x: data[data.length - 1].x + 0.1, y: Math.sin(data[data.length - 1].x + 0.1) });
//         data.shift();
//         updateChart();
//       }, 100);
//     }, []);

//     return <div ref={chartRef}></div>;
//   };

//   export default ECGChart;

// another example code    ......................................................

// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const ECGChart = ({ data }) => {
//   const svgRef = useRef(null);

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);

//     // Set up SVG dimensions
//     const width = 800;
//     const height = 400;
//     const margin = { top: 20, right: 20, bottom: 20, left: 50 };

//     // Create scales
//     const xScale = d3
//       .scaleLinear()
//       .domain([0, d3.max(data, (d) => d.x)])
//       .range([margin.left, width - margin.right]);

//     const yScale = d3
//       .scaleLinear()
//       .domain([d3.min(data, (d) => d.y), d3.max(data, (d) => d.y)])
//       .range([height - margin.bottom, margin.top]);

//     // Define the line function
//     const line = d3
//       .line()
//       .x((d) => xScale(d.x))
//       .y((d) => yScale(d.y));

//     // Draw the line
//     svg
//       .append('path')
//       .datum(data)
//       .attr('fill', 'none')
//       .attr('stroke', 'blue')
//       .attr('stroke-width', 2)
//       .attr('d', line);

//     // Add X-axis
//     svg
//       .append('g')
//       .attr('transform', `translate(0, ${height - margin.bottom})`)
//       .call(d3.axisBottom(xScale));

//     // Add Y-axis
//     svg
//       .append('g')
//       .attr('transform', `translate(${margin.left}, 0)`)
//       .call(d3.axisLeft(yScale));

//     // Add animation
//     const path = svg.select('path');
//     const pathLength = path.node().getTotalLength();

//     path
//       .attr('stroke-dasharray', pathLength)
//       .attr('stroke-dashoffset', pathLength)
//       .transition()
//       .duration(3000)
//       .ease(d3.easeLinear)
//       .attr('stroke-dashoffset', 0);

//   }, [data]);

//   return (
//     <svg ref={svgRef} width={800} height={400}>
//       {/* SVG content will be rendered here */}
//     </svg>
//   );
// };

// export default ECGChart;

// running better code .........................................

// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const ECGChart = ({ data }) => {
//   const chartRef = useRef();

//   useEffect(() => {
//     const svg = d3.select(chartRef.current).attr('width','auto');
//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const width = 600 - margin.left - margin.right;
//     const height = 400 - margin.top - margin.bottom;

//     const xScale = d3.scaleLinear().domain([2, data.length + 2]).range([0, width]);
//     const yScale = d3.scaleLinear().domain([d3.min(data, d => d.y), d3.max(data, d => d.y)]).range([height, 0]);

//     const line = d3.line()
//       .x(d => xScale(d.x))
//       .y(d => yScale(d.y));

//     svg.append('path')
//       .datum(data)
//       .attr('class', 'line')
//       .attr('d', line)
//       .attr('fill', 'none')
//       .attr('stroke', 'steelblue');

//     const xAxis = d3.axisBottom(xScale);
//     const yAxis = d3.axisLeft(yScale);

//     svg.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(xAxis);

//     svg.append('g')
//       .call(yAxis);

//     // Animation
//     svg.select('.line')
//       .transition()
//       .duration(20000)
//       .attrTween('d', () => {
//         const interpolate = d3.scaleLinear()
//           .domain([0, 1])
//           .range([1, data.length + 2]);

//         return t => line(data.slice(0, interpolate(t)));
//       });
//   }, [data]);

//   return (
//     <svg ref={chartRef}  height={400}></svg>
//   );
// };

// export default ECGChart;

// another code with better      .....................................

// // ECGChart.js
// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const ECGChart = ({ data }) => {
//   const chartRef = useRef();

//   useEffect(() => {
//     // Set up SVG container
//     const width = 800;
//     const height = 400;

//     const svg = d3
//       .select(chartRef.current)
//       .append('svg')
//       .attr('width', width)
//       .attr('height', height)
//       .style('border', '1px solid #ddd');

//     // Set up scales
//     const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
//     const yScale = d3.scaleLinear().domain([-20, 100]).range([height, 0]);

//     // Create line function
//     const line = d3
//       .line()
//       .x((d, i) => xScale(i))
//       .y((d) => yScale(d.y));

//     // Draw ECG line
//     svg.append('path').datum(data).attr('class', 'line').attr('d', line);

//     // Function to update chart with new data
//     const updateChart = (newData) => {
//       // Update xScale with new data length
//       xScale.domain([0, newData.length - 1]);

//       // Update chart
//       svg.select('.line').datum(newData).attr('d', line);
//     };

//     const xAxis = d3.axisBottom(xScale).ticks();

//     const yAxis = d3.axisLeft(yScale).ticks(10);

//     // const y2Axis = d3.axisRight(y2Scale).ticks(5);

//     svg
//       .append("g")
//       .call(xAxis)
//       .attr("transform", `translate(0,${height})`)
//       .selectAll("line")
//       .attr("stroke-dasharray", `5, 5`)
//       .attr("stroke", "rgb(144, 241, 141)")
//       .attr("y", `-${height}px`);

//     svg
//       .append("g")
//       .call(yAxis)
//       .selectAll("line")
//       .attr("stroke-dasharray", `5, 5`)
//       .attr("stroke", "rgb(144, 241, 141)")
//       .attr("x", `${width}px`);

//     // Update chart every second (adjust interval as needed)
//     const intervalId = setInterval(() => {
//       // Simulate new data points being received
//       const newPoints = [
//         { x: data.length + 1, y: Math.random() * 100 }, // Simulate new ECG data
//       ];

//       // Append new data points to existing data
//       const newData = [...data, ...newPoints];

//       // Update the chart with new data
//       updateChart(newData);
//     }, 1000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [data]);

//   return <div ref={chartRef}></div>;
// };

// export default ECGChart;

// ................. most working code .............................

// // ECGChart.js
// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const ECGChart = ({ data }) => {
//   const chartRef = useRef();

//   useEffect(() => {
//     // Set up SVG container
//     const width = 800;
//     const height = 400;

//     const svg = d3
//       .select(chartRef.current)
//       .append('svg')
//       .attr('width', width)
//       .attr('height', height)
//       .style('border', '1px solid #ddd');

//     // Set up scales
//     const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
//     const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([height, 0]);

//     // Create line function
//     const line = d3
//       .line()
//       .x((d, i) => xScale(d.x))
//       .y((d) => yScale(d.y));

//     // Draw ECG line without fill
//     svg
//       .append('path')
//       .datum(data)
//       .attr('class', 'line')
//       .attr('d', line)
//       .attr('fill', 'none')
//       .attr('stroke', 'steelblue');

//     // Update chart on data change
//     const updateChart = () => {
//       svg.select('.line').datum(data).attr('d', line);
//     };

//     // Set up interval to update the chart
//     const intervalId = setInterval(() => {
//       // Simulate real-time data streaming by adding a new data point
//       const newDataPoint = { x: data.length + 2, y: Math.random() * 50 + 50 }; // Replace this with your actual data source
//       data.push(newDataPoint);

//       // Update xScale domain based on the new data length
//       xScale.domain([0, data.length - 1]);

//       // Update the chart
//       updateChart();
//     }, 100); // Update every 1000 milliseconds (1 second)

//     // Clean up the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [data]);

//   return <div ref={chartRef}></div>;
// };

// export default ECGChart;

//   .................... most..... working code  ...........................

// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// const LiveECGChart = ({ data }) => {
//   const chartRef = useRef();

//   useEffect(() => {
//     const svg = d3.select(chartRef.current);

//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const width = 600 - margin.left - margin.right;
//     const height = 300 - margin.top - margin.bottom;

//     const xScale = d3.scaleLinear().domain([0, 10]).range([0, width]);
//     const yScale = d3.scaleLinear().domain([-20, 100]).range([height, 0]);

//     const line = d3
//       .line()
//       .x((d) => xScale(d.x))
//       .y((d) => yScale(d.y));

//     svg
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`)
//       .append("path")
//       .datum(data)
//       .attr("class", "line")
//       .attr("fill", "none")
//       .attr("stroke", "steelblue")
//       .attr("d", line);

//     const updateChart = () => {
//       const newData = data.slice(1); // remove the first element
//       newData.push({
//         x: data[data.length - 1].x + 1,
//         y: Math.random() * 60 + 20,
//       }); // add a new random data point

//       xScale.domain([data[0].x, newData[newData.length - 1].x]);
//       const xAxis = d3.axisBottom(xScale);

//       svg.select(".line").datum(newData).attr("d", line);

//       svg.select(".x-axis").call(xAxis);

//       data = newData;
//     };

//     const interval = setInterval(() => {
//       updateChart();
//     }, 100);

//     return () => clearInterval(interval);
//   }, [data]);

//   return (
//     <svg ref={chartRef} width={600} height={300}>
//       <g className="x-axis" transform={`translate(40, ${300 - 30})`} />
//     </svg>
//   );
// };

// export default LiveECGChart;

// .................. success code with repeating data ........................

// ........... get api ...................//

// getECGJson().then((response) => {
//   if (
//     response?.data?.component?.series?.derivation?.derivedSeries?.component
//       ?.sequenceSet?.component
//   ) {
//     let data =
//       response?.data?.component?.series?.derivation?.derivedSeries
//         ?.component?.sequenceSet?.component;

//     setData(data.slice(1));
//   }
// });

// ............... data ..........................

// const ecgData = [
//   { x: 2, y: 30 },
//   { x: 3, y: 30 },
//   { x: 4, y: 30 },
//   { x: 5, y: 30 },
//   { x: 6, y: 30 },
//   { x: 7, y: 30 },
//   { x: 8, y: 30 },
//   { x: 9, y: 30 },
//   { x: 10, y: 30 },
//   { x: 11, y: 60 },
//   { x: 12, y: 45 },
//   { x: 13, y: 9 },
//   { x: 14, y: 4 },
//   { x: 15, y: 28 },
//   { x: 16, y: 17 },
//   { x: 17, y: 51 },
//   { x: 18, y: 30 },
//   { x: 19, y: 30 },
//   { x: 20, y: 30 },
//   { x: 21, y: 30 },
//   { x: 22, y: 30 },
//   { x: 23, y: 30 },
//   { x: 24, y: 55 },
//   { x: 25, y: 10 },
//   { x: 26, y: 25 },
//   { x: 27, y: 70 },
//   { x: 28, y: 30 },
//   { x: 29, y: 55 },
//   { x: 30, y: 10 },
//   { x: 31, y: 30 },
//   { x: 32, y: 30 },
//   { x: 33, y: 30 },
//   { x: 34, y: 30 },
//   { x: 35, y: 30 },
//   { x: 36, y: 30 },
//   { x: 37, y: 30 },
//   { x: 38, y: 5 },
//   { x: 39, y: 20 },
//   { x: 40, y: 55 },
//   { x: 41, y: 60 },
//   { x: 42, y: 30 },
//   { x: 43, y: 75 },
//   { x: 44, y: 20 },
//   { x: 45, y: 30 },
//   { x: 46, y: 30 },
//   { x: 47, y: 30 },
//   { x: 48, y: 30 },
//   { x: 49, y: 30 },
//   { x: 50, y: 30 },
//   { x: 51, y: 30 },
//   { x: 52, y: 5 },
//   { x: 53, y: 25 },
//   { x: 54, y: 70 },
//   { x: 55, y: 45 },
//   { x: 56, y: 55 },
//   { x: 57, y: 35 },
//   { x: 58, y: 15 },
//   { x: 59, y: 30 },
//   { x: 60, y: 30 },
//   { x: 61, y: 30 },
//   { x: 62, y: 30 },
//   { x: 63, y: 30 },
//   { x: 64, y: 30 },
//   { x: 65, y: 30 },
//   { x: 66, y: 30 },
//   { x: 67, y: 30 },
//   { x: 68, y: 30 },
//   { x: 69, y: 30 },
//   { x: 70, y: 50 },
//   { x: 71, y: 20 },
//   { x: 72, y: 40 },
//   { x: 73, y: 15 },
//   { x: 74, y: 35 },
//   { x: 75, y: 10 },
//   { x: 76, y: 25 },
//   { x: 77, y: 10 },
//   { x: 78, y: 30 },
//   { x: 79, y: 30 },
//   { x: 80, y: 30 },
//   { x: 81, y: 30 },
//   { x: 82, y: 30 },
//   { x: 83, y: 30 },
//   { x: 84, y: 30 },
//   { x: 85, y: 30 },
//   { x: 86, y: 76 },
//   { x: 87, y: 46 },
//   { x: 88, y: 24 },
//   { x: 89, y: 5 },
//   { x: 90, y: 35 },
//   { x: 91, y: 55 },
//   { x: 92, y: 25 },
//   { x: 93, y: 30 },
//   { x: 94, y: 60 },
//   { x: 95, y: 30 },
//   { x: 96, y: 10 },
//   { x: 97, y: 35 },
//   { x: 98, y: 55 },
//   { x: 99, y: 30 },
//   { x: 100, y: 30 },
// ];

// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// const LiveECGChart = ({ data }) => {
//   const chartRef = useRef();

//   useEffect(() => {
//     const svg = d3.select(chartRef.current);

//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const width = 600 - margin.left - margin.right;
//     const height = 180 - margin.top - margin.bottom;

//     const xScale = d3.scaleLinear().range([0, width]);
//     const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

//     const line = d3
//       .line()
//       .x((d) => xScale(d.x))
//       .y((d) => yScale(d.y));

//     svg
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`)
//       .append("path")
//       .datum(data)
//       .attr("class", "line")
//       .attr("fill", "none")
//       .attr("stroke", "green")
//       .attr("d", line);

//     let value = 0;
//     const updateChart = () => {
//       const newData = data.slice(1); // remove the first element
//       newData.push({
//         x: data[data.length - 1].x + 1,
//         y: data[value].y,
//       }); // add a new random data point

//       xScale.domain([data[0].x, newData[newData.length - 1].x]);
//       const xAxis = d3.axisBottom(xScale);

//       svg.select(".line").datum(newData).attr("d", line);

//       svg.select(".x-axis").call(xAxis);

//       data = newData;
//     };

//     const interval = setInterval(() => {
//       updateChart();
//     }, 100);

//     return () => clearInterval(interval);
//   }, [data]);

//   return (
//       <svg ref={chartRef} width={650} height={200}>
//         <g className="x-axis" transform={`translate(40, ${300 - 30})`} />
//       </svg>
//   );
// };

// export default LiveECGChart;

// ----------------- real Ecg with single plot --------------------

// import React, { useRef, useEffect, useState } from "react";
// import * as d3 from "d3";

// const LiveECGChart = ({ data }) => {
//   const svgRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const svg = d3.select(svgRef.current).style("margin-left", "50");
//     const width = 1200;
//     const height = 500;
//     const margin = { top: 20, right: 20, bottom: 20, left: 50 };

//     const updateChart = () => {
//       const newData = data.slice(0, currentIndex + 1);

//       const xScale = d3
//         .scaleLinear()
//         .domain([currentIndex - 25, currentIndex])
//         .range([margin.left, width - margin.right]);

//       const yScale = d3
//         .scaleLinear()
//         .domain([-1, 1])
//         .range([height - margin.bottom, 0]);

//       svg
//         .selectAll("path")
//         .data([newData])
//         .join("path")
//         .transition()
//         .duration(100)
//         .attr("fill", "none")
//         .attr("stroke", "red")
//         .attr("stroke-width", 2)
//         .attr(
//           "d",
//           d3
//             .line()
//             .x((d, i) => xScale(i + currentIndex - newData.length))
//             .y((d) => yScale(d ))
//         );

//       svg.select(".x-axis").remove();

//       const xTickValues = Array.from(
//         { length: 26 },
//         (_, i) => currentIndex - 25 + i
//       );

//       const xAxis = d3
//         .axisBottom(xScale)
//         .ticks(26)
//         .tickValues(xTickValues)
//         .tickFormat((d) =>
//           d % 1 === 0 ? (d % 25 === 0 ? `${d / 25}s` : "") : ""
//         )
//         .tickPadding(10);

//       const yAxis = d3
//         .axisLeft(yScale)
//         .ticks(11)
//         .tickFormat((d) =>
//           d === -1 || d === -0.4 || d === 0 || d === 0.4 || d === 1
//             ? `${d}mv`
//             : ""
//         )
//         .tickPadding(10)
//         // .tickSizeInner(-width + margin.left + margin.right) // Set tick size for both positive and negative values
//         .tickSizeOuter(0) // Hide outer ticks
//         // .tickStyle((tick) => ({ fill: "black", "font-weight": "bold", "text-anchor": "start" }))
//         // .tickTransform((tick) => `translate(0,${yScale(tick)})`); // Move ticks above the line

//       svg
//         .append("g")
//         .call(xAxis)
//         .attr("class", "x-axis")
//         .attr("transform", `translate(0, ${height})`)
//         .selectAll("line")
//         .attr("stroke-dasharray", (d) => (d % 5 === 0 ? "0" : "5, 5"))
//         .attr("stroke", (d) => (d % 5 === 0 ? "white" : "gray"))
//         .attr("y1", `-${height}px`);

//       svg
//         .append("g")
//         .call(yAxis)
//         .attr("class", "y-axis")
//         .attr("transform", `translate(0, 0)`)
//         .selectAll("line")
//         .attr("stroke-width", (d) =>
//          d === -1.0 || d === -0.5 || d === 0 || d === 0.5 || d === 1
//              ? "1.5"
//              : "0.5"
//          )
//         .attr("stroke", "#333")
//         .attr("x1", `${width}px`);

//       svg
//         .selectAll(".tick text") // Style x-axis tick values
//         .attr("fill", "green")
//         .style("font-weight", "bold");

//       if (currentIndex < data.length) {
//         setCurrentIndex(currentIndex + 1);
//       }
//     };

//     const interval = setInterval(updateChart, 25);

//     return () => clearInterval(interval);
//   }, [data, currentIndex]);

//   return <svg ref={svgRef} width={1200} height={550}></svg>;
// };

// export default LiveECGChart;
