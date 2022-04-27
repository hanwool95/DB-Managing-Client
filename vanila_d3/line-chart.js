

// line-chart.js
const width = 500;
const height = 500;
const margin = {top: 80, right: 40, bottom: 40, left: 40};

const start_date = new Date('2009-07-24 00:00:00')
const last_date = new Date('2012-09-25 00:00:00')

const mdLabel = ['Latanoprost 0.005% 2.5ml oph', 'Benzbromarone 50mg tab']

const mdMargin = {top: 0.5}

const mdList = [
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
  {date: new Date('2011-03-27 00:00:00'), value: 2},
  {date: new Date('2012-09-25 00:00:00'), value: 2}
  ],
];

// md function

let cur_data = 0

for (const data of mdList) {
    const x = d3.scaleTime()
  .domain([start_date, last_date])
  .range([margin.left, width - margin.right]);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)+mdMargin.top]).nice()
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
        .text(mdLabel[cur_data])
    });

const line = d3.line()
  .defined(d => !isNaN(d.value))
  .x(d => x(d.date))
  .y(d => y(d.value));

var div = d3.select("body").append("div")
     .attr("class", "tooltip-box")
     .style("opacity", 0);

const svg = d3.select('body').append('svg').style('width', width).style('height', height);
svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 3)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line)
    .on('mouseover', function (d, i) {
      console.log(d[i].value)
      console.log(i)
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85');
          div.transition()
               .duration(50)
               .style("opacity", 1);
          div.html(d[i].value)
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

cur_data += 1

}

