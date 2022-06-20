
let MainData

// line-chart.js

let loadingMainData = (path) => {
    return fetch(path)
        .then(response => response.json())
        .then(data => MainData = data)
        .catch(error => console.log(error));
}

const chart_div_id = "#chart_div"

const width = 1000;
const height = 500;
const margin = {top: 10, right: 40, bottom: 40, left: 40};

const lbMargin = {top: 1}

const mdMargin = {top: 0.5}

let start_date;
let last_date;

let originLbLabel = []
let originMdLabel = []

let originLbList = []
let originMdList = []

let event_bars = []

// const start_date = new Date('2009-01-26 08:56:02')
// const last_date = new Date('2012-09-05 09:40:47')
// const originMdLabel = ['Latanoprost 0.005% 2.5ml oph', 'Benzbromarone 50mg tab']
// const originLbLabel = ['Segmented neutrophil', 'Creatinine', 'Bilirubin, total', 'HDL-Cholesterol']
//
// const importantList = [
//     {date: new Date('2009-07-24 00:00:00')},
//     {date: new Date('2009-07-29 00:00:00')},
//     {date: new Date('2009-08-28 00:00:00')},
//     {date: new Date('2010-02-14 00:00:00')},
//     {date: new Date('2010-03-14 00:00:00')},
//     {date: new Date('2010-04-26 00:00:00')},
//     {date: new Date('2011-03-27 00:00:00')},
//     {date: new Date('2012-08-12 10:32:32')},
//     {date: new Date('2012-01-12 10:32:32')},
//     {date: new Date('2012-03-12 10:32:32')},
// ]
//
// const originLbList = [
//     [
//         {date: new Date('2009-01-26 08:56:02'), value: 52.7},
//         {date: new Date('2009-07-10 10:30:44'), value: 52.4},
//         {date: new Date('2009-11-11 10:17:07'), value: 52.5},
//         {date: new Date('2010-04-28 10:34:34'), value: 53.9},
//         {date: new Date('2010-10-13 10:16:23'), value: 53.9},
//         {date: new Date('2011-07-28 11:04:08'), value: 46.7},
//         {date: new Date('2012-01-12 10:32:32'), value: 58.7},
//         {date: new Date('2012-09-05 09:40:47'), value: 53.1}
//     ],
//     [
//         {date: new Date('2009-01-26 08:56:02'), value: 0.94},
//         {date: new Date('2009-07-10 10:30:44'), value: 1.08},
//         {date: new Date('2009-11-11 10:17:07'), value: 1.00},
//         {date: new Date('2010-04-28 10:34:34'), value: 0.96},
//         {date: new Date('2010-10-13 10:16:23'), value: 1.14},
//         {date: new Date('2011-07-28 11:04:08'), value: 1.05},
//         {date: new Date('2012-01-12 10:32:32'), value: 2.97},
//         {date: new Date('2012-09-05 09:40:47'), value: 1.01}
//         ],
//     [
//         {date: new Date('2009-01-26 08:56:02'), value: 1.0},
//         {date: new Date('2009-07-10 10:30:44'), value: 2.2},
//         {date: new Date('2009-11-11 10:17:07'), value: 1.8},
//         {date: new Date('2010-04-28 10:34:34'), value: 1.6},
//         {date: new Date('2010-10-13 10:16:23'), value: 1.0},
//         {date: new Date('2011-07-28 11:04:08'), value: 1.2},
//         {date: new Date('2012-01-12 10:32:32'), value: 1.7},
//         {date: new Date('2012-09-05 09:40:47'), value: 0.9}
//         ],
//     [
//         {date: new Date('2009-01-26 08:56:02'), value: 33.0},
//         {date: new Date('2009-07-10 10:30:44'), value: 38.0},
//         {date: new Date('2009-11-11 10:17:07'), value: 35.0},
//         {date: new Date('2010-04-28 10:34:34'), value: 34.0},
//         {date: new Date('2010-10-13 10:16:23'), value: 40.0},
//         {date: new Date('2011-07-28 11:04:08'), value: 38.0},
//         {date: new Date('2012-01-12 10:32:32'), value: 54.0},
//         {date: new Date('2012-09-05 09:40:47'), value: 33.0}
//         ]
// ]
//
// const originMdList = [
//     [
//   {date: new Date('2009-07-24 00:00:00'), value: 1},
//   {date: new Date('2009-07-29 00:00:00'), value: 2},
//   {date: new Date('2009-08-28 00:00:00'), value: 3},
//   {date: new Date('2009-12-18 00:00:00'), value: 3},
//   {date: new Date('2010-04-26 00:00:00'), value: 5},
//   {date: new Date('2010-12-08 00:00:00'), value: 2},
//   {date: new Date('2011-04-13 00:00:00'), value: 2},
//   {date: new Date('2011-08-17 00:00:00'), value: 2}
//   ],
//     [
//   {date: new Date('2010-02-14 00:00:00'), value: 2},
//   {date: new Date('2010-03-14 00:00:00'), value: 1},
//   {date: new Date('2010-05-09 00:00:00'), value: 1},
//   {date: new Date('2010-05-27 00:00:00'), value: 1},
//   {date: new Date('2010-08-30 00:00:00'), value: 2},
//   {date: new Date('2010-11-28 00:00:00'), value: 2},
//   {date: new Date('2011-03-27 00:00:00'), value: 3},
//   {date: new Date('2012-09-25 00:00:00'), value: 4}
//   ],
// ];

let dateToOnlyDate = (date) =>{
    let dateStringSplited = date.toString().split(" ")
    return dateStringSplited[1] + " " + dateStringSplited[2] + " " + dateStringSplited[3]
}

let making_event_bars_by_num = () => {
    let index = 0
    const events_num = MainData.event_dates
    console.log(events_num)
    console.log(events_num.length)
    console.log(MainData.events)

    for (const [date, values] of Object.entries(MainData.events)) {
        let cur_date = new Date(date)
        console.log(index)
        console.log(cur_date)
        let prev_date;
        let next_date;
        if (index === 0){
            console.log("first")
            prev_date = cur_date
            next_date = new Date(events_num[index+1])
        }
        else if (index === events_num.length - 1){
            console.log("last")
            prev_date = new Date(events_num[index-1])
            next_date = last_date
        }
        else {
            console.log("middle")
            prev_date = new Date(events_num[index-1])
            next_date = new Date(events_num[index+1])
        }
        console.log(prev_date)
        console.log(next_date)

        let start_date = new Date((prev_date.getTime() + cur_date.getTime()) / 2);
        let end_date = new Date((cur_date.getTime() + next_date.getTime()) / 2);
        let middle_date = new Date((start_date.getTime() + end_date.getTime()) / 2);

        event_bars.push({start_date: start_date, end_date: end_date, middle_date: middle_date, dx_date: cur_date,
            important: values.important})

        index += 1
    }

}

let Selected = {

    lbLabel: [],
    lbList: [],
    mdLabel: [],
    mdList: [],

    initList: function(mdLength, lbLength){
        this.lbLabel = [null] * lbLength
        this.lbList = [null] * lbLength
        this.mdLabel = [null] * mdLength
        this.mdList = [null] * mdLength
    },

    printList: function(){
      console.log(this.lbLabel);
      console.log(this.mdLabel);
    },


    pushList: function(targetNum, name){
        if (name === "lb"){
            this.lbLabel[targetNum] = originLbLabel[targetNum]
            this.lbList[targetNum] = originLbList[targetNum]

        }
        else if(name === "md"){
            this.mdLabel[targetNum] = originMdLabel[targetNum]
            this.mdList[targetNum] = originMdList[targetNum]
        }
        else{
            console.log("not find name")
        }
    },

    popList: function(targetNum, name){
        if (name === "lb"){
            this.lbLabel[targetNum] = null
            this.lbList[targetNum] = null
        }
        else if(name === "md"){
            this.mdLabel[targetNum] = null
            this.mdList[targetNum] = null
        }
        else{
            console.log("not find name")
        }
    }

}

let makingAllList = () => {
    makingLine(Selected.lbList, Selected.lbLabel, lbMargin, "lab");
    makingLine(Selected.mdList, Selected.mdLabel, mdMargin, "med");
    makingBar(event_bars);
}


let makingcheckBox = (label, fieldName) => {
    label.forEach((data, index) => {
        $("#div_chk")
            .append("<span id='span_chk'><input type='checkbox' id='id_chk"+fieldName+index+"' " +
                "class='class_chk' name='chk"+data+"' value='"+data+"' onClick='drawLineByCheck(\""+index+"\",\""+fieldName+"\")' checked=\"chekced\">"
            +data+"</span>");
    })
    $("#div_chk").append("<br>")
}

let drawLineByCheck = (labelNumber, fieldName) => {
    $(chart_div_id).empty();
    current = document.getElementById('id_chk'+fieldName+labelNumber.toString())
    if (!!current.checked){
        Selected.pushList(labelNumber, fieldName)
    }
    else {
        Selected.popList(labelNumber, fieldName)
    }
    // Selected.printList()
    makingAllList();
}

let drawLineGraph = (data, dataLabel, dataMargin, cur_number) => {
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
            let onlyDate = dateToOnlyDate(d.date)
            div.html(d.value+"<br>"+onlyDate)
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


}


let makingLine = (dataList, dataLabel, dataMargin, title) => {
    d3.select(chart_div_id).append("h1").text(title)
    let cur_number = 0
    for (const data of dataList) {
        if (!!data) {
            drawLineGraph(data, dataLabel, dataMargin, cur_number);
        }
        cur_number += 1
    }
}



let makingBar = (data) => {
    svgs = d3.selectAll("svg")
    const x = d3.scaleTime()
        .domain([start_date, last_date])
        .range([margin.left, width - margin.right]);

    let barWidth = (start_date, end_date) => {
        return (x(end_date) - x(start_date))
        // return x(end_date.getTime() - start_date.getTime())
    }

    let div = d3.select(chart_div_id).append("div")
        .attr("class", "tooltip-box")
        .style("opacity", 0);

    console.log(data)

    svgs
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("height", height)
        .attr("width", (d) => barWidth(d.start_date, d.end_date))
        .attr("x", (d) => x(d.start_date))
        .attr("y", 0)
        .attr("fill", "orange")
        .attr('opacity', (d) => {
            if (d.important){
                return '0.3'
            }
            else {
                return '0'
            }
        })
        .on('click', function(d) {
            d.important = !d.important;
        })
        .on('mouseover', function (d) {
            d3.select(this).transition()
                .attr('opacity', (d) => {
                    if (d.important){
                return '0.85'
            }
            else {
                return '0.3'
            }
                });
            div.transition()
                .duration(50)
                .style("opacity", 1);
            div.html(dateToOnlyDate(d.dx_date))
                .style("left", (d3.event.pageX + 30) + "px")
                .style("top", (d3.event.pageY - 30) + "px");
        })
        .on('mouseout', function (d) {
            d3.select(this).transition()
                .attr('opacity', (d) => {
                    if (d.important){
                        return '0.3'
                    }
                    else {
                        return '0'
                    }
                })
            div.transition()
                .duration(50)
                .style("opacity", 0);
        });

}

let allCheck = (label, fieldName) =>{
    label.forEach((data, index) => {
     Selected.pushList(index, fieldName)
    })
}

async function main(){
    await loadingMainData('./Case2.json')

    console.log("load complete");

    event_dates = MainData.event_dates

    start_date = new Date(event_dates[0])
    last_date = new Date(event_dates[event_dates.length - 1])

    making_event_bars_by_num();

    events = MainData.events

    for (const [date, values] of Object.entries(events)) {
        values.lab.forEach((data) => {
            if (data.lab_type === "Number"){
                let lab_name = data.lab_name
                let lab_num = data.lab_num

                if (originLbLabel.includes(lab_name)) {
                    lab_index = originLbLabel.findIndex((e) => e === lab_name);
                    originLbList[lab_index].push({date: new Date(date), value: lab_num})
                }
                else {
                    originLbLabel.push(lab_name)
                    originLbList.push([{date: new Date(date), value: lab_num}])
                }

            }
        })
    }

    originLbList.forEach((data) => {
        data.sort(function (a, b) {
            if (a.date > b.date) {
                return -1;
            }
            else{
                return 1;
            }
        })
    })
    console.log(event_bars)

    makingcheckBox(originLbLabel, "lb")
    makingcheckBox(originMdLabel, "md")
    allCheck(originLbLabel, "lb")
    allCheck(originMdLabel, "md")
    makingAllList();
}

// const originLbLabel = ['Segmented neutrophil', 'Creatinine', 'Bilirubin, total', 'HDL-Cholesterol']

// const originLbList = [
//     [
//         {date: new Date('2009-01-26 08:56:02'), value: 52.7},
//         {date: new Date('2009-07-10 10:30:44'), value: 52.4},
//         {date: new Date('2009-11-11 10:17:07'), value: 52.5},
//         {date: new Date('2010-04-28 10:34:34'), value: 53.9},
//         {date: new Date('2010-10-13 10:16:23'), value: 53.9},
//         {date: new Date('2011-07-28 11:04:08'), value: 46.7},
//         {date: new Date('2012-01-12 10:32:32'), value: 58.7},
//         {date: new Date('2012-09-05 09:40:47'), value: 53.1}
//     ],

main();


// makingLine(lbList, lbLabel, lbMargin, "lab");
// makingLine(mdList, mdLabel, mdMargin, "med");



