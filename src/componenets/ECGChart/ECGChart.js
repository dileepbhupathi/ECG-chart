import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const LiveECGChart = ({ data }) => {
  const svgRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .style("margin-left", "30")
      .style("margin-right", "30");
    const width = 400;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 20, left: 50 };

    const updateChart = () => {
      const pointsPerSecond = 500;
      const nonValueTicksPerSecond = 5;
      const gridLinesPerNonValueTick = 5;

      // ------------ for single plot data comment above three declared variables---------------------//

      const totalPoints = currentIndex + data.length; //--------- for single plot the data comment line----------//
      const newData = data.slice(0, totalPoints);

      // ----------- for single plot the data ---------------//
      //       const newData = data.slice(0, currentIndex + 1);

      const xScale = d3
        .scaleLinear()
        .domain([currentIndex, currentIndex + 1])
        .range([0, width]);

      // ------------ for single plot xScale  --------------//

      //       const xScale = d3
      //         .scaleLinear()
      //         .domain([currentIndex - 25, currentIndex])
      //         .range([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain([-1, 1])
        .range([height, margin.top]);

      svg
        .selectAll("path")
        .data([newData])
        .join("path")
        .transition()
        .duration(100)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 1)
        .attr(
          "d",
          d3
            .line()
            .x((d, i) => xScale((currentIndex + i) / pointsPerSecond))
            // ---------- for single plot ------------------//
            //             .x((d, i) => xScale(i + currentIndex - newData.length))
            .y((d) => yScale(d))
        );

      svg.select(".x-axis").remove();

      const xTickValues = Array.from(
        { length: nonValueTicksPerSecond * gridLinesPerNonValueTick },
        (_, i) => {
          const tickValue =
            currentIndex + i * (pointsPerSecond / gridLinesPerNonValueTick);
          return tickValue;
        }
      );

      //   ------------- for single plot tickValue ----------------//

      //       const xTickValues = Array.from(
      //         { length: 26 },
      //         (_, i) => currentIndex - 25 + i
      //       );

      const xAxis = d3
        .axisBottom(xScale)
        .ticks(1)
        // .tickValues(xTickValues)
        .tickFormat((d, i) => {
          console.log("r", d);
          return `${d.toFixed(0) % 25}s`;
        })
        .tickSizeOuter(0);

      // ---------- x-axis ticks for single plot ----------//

      // const xAxis = d3
      //         .axisBottom(xScale)
      //         .ticks(26)
      //         .tickValues(xTickValues)
      //         .tickFormat((d) =>
      //           d % 1 === 0 ? (d % 25 === 0 ? `${d / 25}s` : "") : ""
      //         )
      //         .tickPadding(10);

      const yAxis = d3
        .axisRight(yScale)
        .ticks(20)
        .tickFormat((d) =>
          d === -1.0 || d === -0.5 || d === 0 || d === 0.5 || d === 1
            ? `${d}mv`
            : ""
        );

      svg
        .append("g")
        .call(xAxis)
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .selectAll("line.grid-line") // Select or create grid lines
        .data(xScale.ticks(xTickValues.length))
        .enter()
        .append("line")
        .attr("class", "grid-line")
        .attr("stroke", "#333")
        .attr("stroke-width", (d) => {
          return d % 0.25 === 0 ? "1" : "0.5";
        })
        .attr("y1", `-${height - margin.top}px`)
        .attr("y2", 0)
        .attr("x1", (d) => xScale(d))
        .attr("x2", (d) => xScale(d));

      //    -------------------- for single plot x-axis graph  ---------------//

      // svg
      //         .append("g")
      //         .call(xAxis)
      //         .attr("class", "x-axis")
      //         .attr("transform", `translate(0, ${height})`)
      //         .selectAll("line")
      //         .attr("stroke-dasharray", (d) => (d % 5 === 0 ? "0" : "5, 5"))
      //         .attr("stroke", (d) => (d % 5 === 0 ? "white" : "gray"))
      //         .attr("y1", `-${height}px`);

      svg
        .selectAll("path")
        .attr(
          "transform",
          `translate(${width - currentIndex * (width / pointsPerSecond)}, 0)`
        );

      svg
        .append("g")
        .call(yAxis)
        .attr("class", "y-axis")
        .attr("transform", `translate(0, 0)`)
        .selectAll("line")
        .attr("stroke", "#333")
        .attr("stroke-width", (d) =>
          d === -1.0 || d === -0.5 || d === 0 || d === 0.5 || d === 1
            ? "1.5"
            : "0.5"
        )
        .attr("x1", `${width}px`);
      svg
        .selectAll(".tick text") // Style x-axis tick values
        .attr("fill", "white")
        .style("font-size", "8px")
        .attr("x", "10px")
        .attr("y", "-5px")
        .style("font-weight", "500");

      // console.log("cur", currentIndex.toFixed(3));

      if (currentIndex < data.length / pointsPerSecond) {
        setCurrentIndex(currentIndex + 0.02);
      } else {
        clearInterval(interval); // Clear the interval to stop scrolling
      }

      //  for single plot -------------- //

      // if (currentIndex < data.length) {
      //         setCurrentIndex(currentIndex + 1);
      //       }
    };

    const interval = setInterval(updateChart, 25);

    return () => clearInterval(interval);

  }, [data, currentIndex]);

  return (
    <svg
      ref={svgRef}
      width={400}
      height={280}
      preserveAspectRatio="xMinYMin meet"
    ></svg>
  );
};

export default LiveECGChart;
