

// line-chart.js
const width = 500;
const height = 500;
const margin = {top: 40, right: 40, bottom: 40, left: 40};


const start_date = new Date('2009-07-24 00:00:00')
const last_date = new Date('2012-09-25 00:00:00')

const data_label = ['Latanoprost 0.005% 2.5ml oph', 'Benzbromarone 50mg tab']



const data_list = [
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
  {date: new Date('2010-02-14 00:00:00'), value: 1},
  {date: new Date('2010-03-14 00:00:00'), value: 1},
  {date: new Date('2010-05-09 00:00:00'), value: 1},
  {date: new Date('2010-05-27 00:00:00'), value: 1},
  {date: new Date('2010-08-30 00:00:00'), value: 2},
  {date: new Date('2010-11-28 00:00:00'), value: 2},
  {date: new Date('2011-03-27 00:00:00'), value: 2},
  {date: new Date('2012-09-25 00:00:00'), value: 2}
  ],
];
let cur_data = 0
for (const data of data_list) {
    const x = d3.scaleTime()
  .domain([start_date, last_date])
  .range([margin.left, width - margin.right]);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)]).nice()
  .range([height - margin.bottom, margin.top]);

const xAxis = g => g
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x).ticks(width / 90).tickSizeOuter(0));

const yAxis = g => g
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(y))
  // .call(g => g.select(".domain").remove())
  .call(g => {
    return g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("y", -10)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("font-size", '20px')
        .text(data_label[cur_data])
    });

const line = d3.line()
  .defined(d => !isNaN(d.value))
  .x(d => x(d.date))
  .y(d => y(d.value));

const svg = d3.select('body').append('svg').style('width', width).style('height', height);
svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1)
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("d", line);
svg.append('g').call(xAxis);
svg.append('g').call(yAxis);
svg.node();

cur_data += 1

}

