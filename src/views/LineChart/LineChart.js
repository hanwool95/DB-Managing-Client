
import React from "react"
import * as d3 from "d3";

const LineChart = ({ data = [], dimensions = {} }) => {
    const svgRef = React.useRef(null);

    // app에서 지정한 공간 정의.
    const { width, height, margin = {} } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    React.useEffect(() => {
        const xScale = d3
            .scaleTime() // 타입 지정
            .domain(d3.extent(data[0].items, (d) => d.date))  // 날짜 데이터를 받아와서 도메인 설정.
            .range([0, width]); // 크기 지정
        const yScale = d3
            .scaleLinear()
            .domain([
                d3.min(data[0].items, (d) => d.value) - 50,
                d3.max(data[0].items, (d) => d.value) + 50
            ])
            .range([height, 0]);

        // 차트를 담을 수 있는 루트 컨테이너
        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove(); // 초기화.
        // margin 바탕으로 설정
        const svg = svgEl
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top}`);

        // 그리드 추가
        const xAxis = d3
            .axisBottom(xScale) // 아래 라인을 넣는데 그 크기는 xScale로 설정함.
            .ticks(5)
            .tickSize(-height + margin.bottom);
        const xAxisGroup = svg
            .append("g")
            .attr("transform", `translate(0, ${height - margin.bottom}`)
            .call(xAxis);
        xAxisGroup.select(".domain").remove();
        xAxisGroup.selectAll("line")
            .attr("stroke", "rgba(255, 255, 255, 0.2"); //라인 그리는데 attribute 설정
        xAxisGroup
            .attr("opacity", 0.5)
            .attr("color", "white")
            .attr("font-size", "0.75rem")

        const yAxis = d3
            .axisLeft(yScale) // 왼쪽 라인 넣는데 그 크기는 yScale로.
            .ticks(5)
            .tickSize(-width)
            .tickFormat((val) => `${val}%`); // 포맷 설정 ~%로
        const yAxisGroup = svg
            .append("g")
            .call(yAxis)
        yAxisGroup.select(".domain").remove();
        yAxisGroup.selectAll("line")
            .attr("stroke", "rgba(255, 255, 255, 0.2");
        yAxisGroup
            .selectAll("text")
            .attr("opacity", 0.5)
            .attr("color", "white")
            .attr("font-size", "0.75rem");


        // 데이터 선 그리는 부분
        const line = d3
            .line()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.value));

        svg
            .selectAll(".line")
            .data(data) // 데이터 지정
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", (d) => d.color) // 데이터 안에 color:로 색 설정해 놓음. 그것으로 선 그림.
            .attr("stroke-width", 3)
            .attr("d", (d) => line(d.items));
    },
        [data]
    ); // useEffect의 끝

    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;

};

export default LineChart;