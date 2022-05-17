

// line-chart.js

const chart_div_id = "#chart_div"

const width = 1000;
const height = 500;
const margin = {top: 10, right: 40, bottom: 40, left: 40};

const start_date = new Date('2009-01-26 08:56:02')
const last_date = new Date('2012-09-05 09:40:47')

const originMdLabel = ['Latanoprost 0.005% 2.5ml oph', 'Benzbromarone 50mg tab']

const originLbLabel = ['Segmented neutrophil', 'Creatinine', 'Bilirubin, total', 'HDL-Cholesterol'] // Todo Data preprocessing "" 전처리 필요

const lbMargin = {top: 1}

const mdMargin = {top: 0.5}

const importantList = [
    {date: new Date('2009-07-24 00:00:00')},
    {date: new Date('2009-07-29 00:00:00')},
    {date: new Date('2009-08-28 00:00:00')},
    {date: new Date('2010-02-14 00:00:00')},
    {date: new Date('2010-03-14 00:00:00')},
    {date: new Date('2010-04-26 00:00:00')},
    {date: new Date('2011-03-27 00:00:00')},
    {date: new Date('2012-08-12 10:32:32')},
    {date: new Date('2012-01-12 10:32:32')},
    {date: new Date('2012-03-12 10:32:32')},
]

const originLbList = [
    [
        {date: new Date('2009-01-26 08:56:02'), value: 52.7},
        {date: new Date('2009-07-10 10:30:44'), value: 52.4},
        {date: new Date('2009-11-11 10:17:07'), value: 52.5},
        {date: new Date('2010-04-28 10:34:34'), value: 53.9},
        {date: new Date('2010-10-13 10:16:23'), value: 53.9},
        {date: new Date('2011-07-28 11:04:08'), value: 46.7},
        {date: new Date('2012-01-12 10:32:32'), value: 58.7},
        {date: new Date('2012-09-05 09:40:47'), value: 53.1}
    ],
    [
        {date: new Date('2009-01-26 08:56:02'), value: 0.94},
        {date: new Date('2009-07-10 10:30:44'), value: 1.08},
        {date: new Date('2009-11-11 10:17:07'), value: 1.00},
        {date: new Date('2010-04-28 10:34:34'), value: 0.96},
        {date: new Date('2010-10-13 10:16:23'), value: 1.14},
        {date: new Date('2011-07-28 11:04:08'), value: 1.05},
        {date: new Date('2012-01-12 10:32:32'), value: 2.97},
        {date: new Date('2012-09-05 09:40:47'), value: 1.01}
        ],
    [
        {date: new Date('2009-01-26 08:56:02'), value: 1.0},
        {date: new Date('2009-07-10 10:30:44'), value: 2.2},
        {date: new Date('2009-11-11 10:17:07'), value: 1.8},
        {date: new Date('2010-04-28 10:34:34'), value: 1.6},
        {date: new Date('2010-10-13 10:16:23'), value: 1.0},
        {date: new Date('2011-07-28 11:04:08'), value: 1.2},
        {date: new Date('2012-01-12 10:32:32'), value: 1.7},
        {date: new Date('2012-09-05 09:40:47'), value: 0.9}
        ],
    [
        {date: new Date('2009-01-26 08:56:02'), value: 33.0},
        {date: new Date('2009-07-10 10:30:44'), value: 38.0},
        {date: new Date('2009-11-11 10:17:07'), value: 35.0},
        {date: new Date('2010-04-28 10:34:34'), value: 34.0},
        {date: new Date('2010-10-13 10:16:23'), value: 40.0},
        {date: new Date('2011-07-28 11:04:08'), value: 38.0},
        {date: new Date('2012-01-12 10:32:32'), value: 54.0},
        {date: new Date('2012-09-05 09:40:47'), value: 33.0}
        ]
]

const originMdList = [
    [
  {date: new Date('2009-07-24 00:00:00'), value: 1},
  {date: new Date('2009-07-29 00:00:00'), value: 2},
  {date: new Date('2009-08-28 00:00:00'), value: 3},
  {date: new Date('2009-12-18 00:00:00'), value: 3},
  {date: new Date('2010-04-26 00:00:00'), value: 5},
  {date: new Date('2010-12-08 00:00:00'), value: 2},
  {date: new Date('2011-04-13 00:00:00'), value: 2},
  {date: new Date('2011-08-17 00:00:00'), value: 2}
  ],
    [
  {date: new Date('2010-02-14 00:00:00'), value: 2},
  {date: new Date('2010-03-14 00:00:00'), value: 1},
  {date: new Date('2010-05-09 00:00:00'), value: 1},
  {date: new Date('2010-05-27 00:00:00'), value: 1},
  {date: new Date('2010-08-30 00:00:00'), value: 2},
  {date: new Date('2010-11-28 00:00:00'), value: 2},
  {date: new Date('2011-03-27 00:00:00'), value: 3},
  {date: new Date('2012-09-25 00:00:00'), value: 4}
  ],
];

let Selected = {
    mdLabel: [],
    lbLabel: [],
    mdList: [],
    lbList: [],

    pushList: function(targetNum, name){
        console.log(name)
        if (name === "md"){
            this.mdLabel.push(originMdLabel[targetNum])
            this.mdList.push(originMdList[targetNum])
        }
        else if(name === "lb"){
            this.lbLabel.push(originLbLabel[targetNum])
            this.lbList.push(originLbList[targetNum])
        }
        else{
            console.log("not find name")
        }
    }

}



let makingcheckBox = (label, fieldName) => {
    // for (i = 0; i < Object.keys(label).length; i++)
    // {
    //     $("#div_chk")
    //         .append("<span id='span_chk'><input type='checkbox' id='id_chk' class='class_chk' name='chk"+label[i]+"' value='"+label[i]+"' onClick='drawLineByCheck(\""+label[i]+"\")'>"+label[i]+"</span>");
    // }
    label.forEach((data, index) => {
        $("#div_chk")
            .append("<span id='span_chk'><input type='checkbox' id='id_chk' class='class_chk' name='chk"+data+"' value='"+data+"' onClick='drawLineByCheck(\""+index+"\",\""+fieldName+"\")'>"
            +data+"</span>");
    })
    $("#div_chk").append("<br>")
}

let drawLineByCheck = (labelName, fieldName) => {
    console.log(labelName)
    $(chart_div_id).empty();
    Selected.pushList(labelName, fieldName)
    makingLine(Selected.lbList, Selected.lbLabel, lbMargin, "lab");
    makingLine(Selected.mdList, Selected.mdLabel, mdMargin, "med");
}



let makingLine = (dataList, dataLabel, dataMargin, title) =>{
    d3.select(chart_div_id).append("h1").text(title)
    let cur_number = 0

    for (const data of dataList) {
    const x = d3.scaleTime()
        .domain([start_date, last_date])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)+dataMargin.top]).nice()
        .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 90).tickSizeOuter(0));

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => {
            return g.select(".tick:last-of-type text").clone()
                .attr("x", 10)
                .attr("y", 20)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .attr("font-size", '20px')
                .text(dataLabel[cur_number])
        });

    const line = d3.line()
        .defined(d => !isNaN(d.value))
        .x(d => x(d.date))
        .y(d => y(d.value));

    var div = d3.select(chart_div_id).append("div")
        .attr("class", "tooltip-box")
        .style("opacity", 0);
    const svg = d3.select(chart_div_id).append('svg').style('width', width).style('height', height);

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line)

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", d=>x(d.date))
        .attr("cy", d=>y(d.value))
        .style("fill", "black")
        .on('mouseover', function (d) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85');
            div.transition()
                .duration(50)
                .style("opacity", 1);
            div.html(d.value+"<br><br>"+d.date.toString())
                .style("left", (d3.event.pageX + 30) + "px")
                .style("top", (d3.event.pageY - 30) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            div.transition()
                .duration('50')
                .style("opacity", 0);
        });

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
    svg.node();

    cur_number += 1
    }

}

let makingBar = (data) => {
    svgs = d3.selectAll("svg")
    const x = d3.scaleTime()
        .domain([start_date, last_date])
        .range([margin.left, width - margin.right]);
    svgs
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("height", height)
        .attr("width", 5)
        .attr("x", (d) => x(d.date))
        .attr("y", 0)
        .attr("fill", "orange")
        .attr('opacity', '0.3');
}

makingcheckBox(originLbLabel, "lb")
makingcheckBox(originMdLabel, "md")
// makingLine(lbList, lbLabel, lbMargin, "lab");
// makingLine(mdList, mdLabel, mdMargin, "med");
makingBar(importantList);



