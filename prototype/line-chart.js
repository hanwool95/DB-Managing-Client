// line-chart.js


const lb_filtered_condition = [
  "Uric Acid(\uac80\uc0ac24\uc2dc\uac04\uac00\ub2a5)",
  "GPT (ALT)(검사24시간가능)",
  "GOT (AST)(검사24시간가능)",
  "Creatinine(검사24시간가능)",
  "GOT (AST)(\uac80\uc0ac24\uc2dc\uac04\uac00\ub2a5)",
  "Creatinine(\uac80\uc0ac24\uc2dc\uac04\uac00\ub2a5)",
  "GPT (ALT)(\uac80\uc0ac24\uc2dc\uac04\uac00\ub2a5)",
];

const lb_outlier_dict = {
  "Uric Acid(\uac80\uc0ac24\uc2dc\uac04\uac00\ub2a5)": [3, 7],
  "GPT (ALT)(\uac80\uc0ac24\uc2dc\uac04\uac00\ub2a5)": [1, 40],
  "GOT (AST)(\uac80\uc0ac24\uc2dc\uac04\uac00\ub2a5)": [1, 40],
  "Creatinine(\uac80\uc0ac24\uc2dc\uac04\uac00\ub2a5)": [0.7, 1.4],
};


const chart_div_id = "#chart_div";

const graphDiv = document.getElementById("chart_div");

const width = graphDiv.getBoundingClientRect().width;
const height = 200;
const margin = { top: 10, right: 40, bottom: 40, left: 40 };

const lbMargin = { top: 1 };

const mdMargin = { top: 0.5 };

let start_date;
let last_date;

let originLbLabel = [];
let originMdLabel = [];

let originLbList = [];
let originMdList = [];

let event_bars = [];

let dateToOnlyDate = (date) => {
  //   console.log(date);
  let dateStringSplited = date.toString().split(" ");
  return (
    dateStringSplited[1] +
    " " +
    dateStringSplited[2] +
    " " +
    dateStringSplited[3]
  );
};

let making_event_bars_by_num = () => {
  let index = 0;
  const events_num = MainData.event_dates;

  for (const [date, values] of Object.entries(MainData.events)) {
    let cur_date = new Date(date);
    let prev_date;
    let next_date;
    if (index === 0) {
      prev_date = cur_date;
      next_date = new Date(events_num[index + 1]);
    } else if (index === events_num.length - 1) {
      prev_date = new Date(events_num[index - 1]);
      next_date = last_date;
    } else {
      prev_date = new Date(events_num[index - 1]);
      next_date = new Date(events_num[index + 1]);
    }

    let start_date = new Date((prev_date.getTime() + cur_date.getTime()) / 2);
    let end_date = new Date((cur_date.getTime() + next_date.getTime()) / 2);
    let middle_date = new Date((start_date.getTime() + end_date.getTime()) / 2);

    event_bars.push({
      start_date: start_date,
      end_date: end_date,
      middle_date: middle_date,
      dx_date: cur_date
    });

    index += 1;
  }
};

let Selected = {
  lbLabel: [],
  lbList: [],
  mdLabel: [],
  mdList: [],

  initList: function (mdLength, lbLength) {
    this.lbLabel = [null] * lbLength;
    this.lbList = [null] * lbLength;
    this.mdLabel = [null] * mdLength;
    this.mdList = [null] * mdLength;
  },

  printList: function () {
    console.log(this.lbLabel);
    console.log(this.mdLabel);
  },

  pushList: function (targetNum, name) {
    if (name === "lb") {
      this.lbLabel[targetNum] = originLbLabel[targetNum];
      this.lbList[targetNum] = originLbList[targetNum];
    } else if (name === "md") {
      this.mdLabel[targetNum] = originMdLabel[targetNum];
      this.mdList[targetNum] = originMdList[targetNum];
    } else {
      console.log("not find name");
    }
  },

  popList: function (targetNum, name) {
    if (name === "lb") {
      this.lbLabel[targetNum] = null;
      this.lbList[targetNum] = null;
    } else if (name === "md") {
      this.mdLabel[targetNum] = null;
      this.mdList[targetNum] = null;
    } else {
      console.log("not find name");
    }
  },
};

let makingAllList = () => {
  makingLine(Selected.lbList, Selected.lbLabel, lbMargin, "lab");
  //   makingLine(Selected.mdList, Selected.mdLabel, mdMargin, "med");
  makingBar(event_bars);
  makingDot(Selected.lbList, Selected.lbLabel, lbMargin, "lab");
  //   makingDot(Selected.mdList, Selected.mdLabel, mdMargin, "med");
};

let makingcheckBox = (label, fieldName) => {
  $("#div_chk").append(
    fieldName[0].toUpperCase() + fieldName.substring(1) + "<br>"
  );
  label.forEach((data, index) => {
    $("#div_chk").append(
      "<span id='span_chk'><input type='checkbox' id='id_chk" +
        fieldName +
        index +
        "' " +
        "class='class_chk' name='chk" +
        data +
        "' value='" +
        data +
        "' onClick='drawLineByCheck(\"" +
        index +
        '","' +
        fieldName +
        '")\' checked="chekced">' +
        data +
        "</span>"
    );
  });
  $("#div_chk").append("<br>");
};

let drawLineByCheck = (labelNumber, fieldName) => {
  $(chart_div_id).empty();
  current = document.getElementById(
    "id_chk" + fieldName + labelNumber.toString()
  );
  if (!!current.checked) {
    Selected.pushList(labelNumber, fieldName);
  } else {
    Selected.popList(labelNumber, fieldName);
  }
  // Selected.printList()
  makingAllList();
};

let drawLineGraph = (data, dataLabel, dataMargin, svgId) => {
  const x = d3
    .scaleTime()
    .domain([start_date, last_date])
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) + dataMargin.top])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const xAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .ticks(width / 90)
        .tickSizeOuter(0)
    );

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call((g) => {
        return g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 10)
          .attr("y", 20)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .attr("font-size", "20px")
          .text(dataLabel);
      });

  const line = d3
    .line()
    .defined((d) => !isNaN(d.value))
    .x((d) => x(d.date))
    .y((d) => y(d.value));

  // var div = d3.select(chart_div_id).append("div")
  //     .attr("class", "tooltip-box")
  //     .style("opacity", 0);
  const svg = d3
    .select(chart_div_id)
    .append("svg")
    .style("width", width)
    .style("height", height)
    .attr("id", svgId);

  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line);

  if (lb_outlier_dict[dataLabel]) {
    outlier = lb_outlier_dict[dataLabel];
    svg
      .append("rect")
      .attr("height", y(outlier[0]) - y(outlier[1]))
      .attr("width", width)
      .attr("x", 0)
      .attr("y", y(outlier[1]))
      .attr("fill", "#FF6976")
      .attr("opacity", 0.26);
  }

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();
};

const drawingDot = (data, dataLabel, dataMargin, svgId) => {
  const x = d3
    .scaleTime()
    .domain([start_date, last_date])
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) + dataMargin.top])
    .nice()
    .range([height - margin.bottom, margin.top]);

  let div = d3
    .select(chart_div_id)
    .append("div")
    .attr("class", "tooltip-box")
    .style("opacity", 0);

  const svg = d3
    .select(chart_div_id)
    .select("#" + svgId)
    .append("svg")
    .style("width", width)
    .style("height", height)
    .attr("id", svgId + "dot");

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 3)
    .attr("cx", (d) => x(d.date))
    .attr("cy", (d) => y(d.value))
    .style("fill", "black")
    .on("mouseover", function (d) {
      d3.select(this).transition().duration("50").attr("opacity", ".85");
      div.transition().duration(50).style("opacity", 1);
      div
        .html(d.value)
        .style("left", d3.event.pageX + 30 + "px")
        .style("top", d3.event.pageY - 30 + "px");
    })
    .on("mouseout", function (d, i) {
      d3.select(this).transition().duration("50").attr("opacity", "1");
      div.transition().duration("50").style("opacity", 0);
    });
};

let makingDot = (dataList, dataLabel, dataMargin, title) => {
  let cur_number = 0;
  for (const data of dataList) {
    if (!!data) {
      drawingDot(
        data,
        dataLabel[cur_number],
        dataMargin,
        title + cur_number.toString()
      );
    }
    cur_number += 1;
  }
};

let makingLine = (dataList, dataLabel, dataMargin, title) => {
  //   d3.select(chart_div_id).append("h1").text(title);
  let cur_number = 0;
  for (const data of dataList) {
    if (!!data) {
      drawLineGraph(
        data,
        dataLabel[cur_number],
        dataMargin,
        title + cur_number.toString()
      );
    }
    cur_number += 1;
  }
};

let makingBar = (data) => {
  svgs = d3.selectAll("svg");
  const x = d3
    .scaleTime()
    .domain([start_date, last_date])
    .range([margin.left, width - margin.right]);

  let barWidth = (start_date, end_date) => {
    return x(end_date) - x(start_date);
    // return x(end_date.getTime() - start_date.getTime())
  };

  let div = d3
    .select(chart_div_id)
    .append("div")
    .attr("class", "tooltip-box")
    .style("opacity", 0);

  svgs
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("height", height)
    .attr("width", (d) => barWidth(d.start_date, d.end_date))
    .attr("x", (d) => x(d.start_date))
    .attr("y", 0)
    .attr("fill", "skyblue")
    .attr("opacity", (d, i) => {
      if (Object.values(MainData.events)[i].important) {
        return "0.3";
      } else {
        return "0";
      }
    })
    .on("click", function (d, i) {
      console.log(MainData.events)
      Object.values(MainData.events)[i].important = !Object.values(MainData.events)[i].important;
      svgs.selectAll("rect").dispatch("mouseout");
      renderImportantEvents()
    })
    .on("mouseover", function (d) {
      d3.select(this)
        .transition()
        .attr("opacity", (d, i) => {
          if (Object.values(MainData.events)[i].important) {
            return "0.85";
          } else {
            return "0.3";
          }
        });
      div.transition().duration(50).style("opacity", 1);
      div
        .html(dateToOnlyDate(d.dx_date))
        .style("left", d3.event.pageX + 30 + "px")
        .style("top", d3.event.pageY - 30 + "px");
    })
    .on("mouseout", function (d, i) {
      d3.select(this)
        .transition()
        .attr("opacity", (d) => {
          if (Object.values(MainData.events)[i].important) {
            return "0.3";
          } else {
            return "0";
          }
        });
      div.transition().duration(50).style("opacity", 0);
    });
};

let allCheck = (label, fieldName) => {
  label.forEach((data, index) => {
    Selected.pushList(index, fieldName);
  });
};

async function main() {

  lc_event_dates = MainData.event_dates;

  start_date = new Date(lc_event_dates[0]);
  last_date = new Date(lc_event_dates[lc_event_dates.length - 1]);

  making_event_bars_by_num();

  events = MainData.events;

  for (const [date, values] of Object.entries(events)) {
    values.lab.forEach((data) => {
      if (data.lab_type === "Number") {
        let lab_name = data.lab_name;
        if (lb_filtered_condition.includes(lab_name)) {
          let lab_num = data.lab_num;

          if (originLbLabel.includes(lab_name)) {
            lab_index = originLbLabel.findIndex((e) => e === lab_name);
            originLbList[lab_index].push({
              date: new Date(date),
              value: lab_num,
            });
          } else {
            originLbLabel.push(lab_name);
            originLbList.push([{ date: new Date(date), value: lab_num }]);
          }
        }
      }
    });

    originLbList.forEach((data) => {
      data.sort(function (a, b) {
        if (a.date > b.date) {
          return -1;
        } else {
          return 1;
        }
      });
    });

    values.med.forEach((data) => {
      let med_name = data.med_name_ingr;
      let prescription = data.duration;
      if (originMdLabel.includes(med_name)) {
        med_index = originMdLabel.findIndex((e) => e === med_name);
        originMdList[med_index].push({
          date: new Date(date),
          value: prescription,
        });
      } else {
        originMdLabel.push(med_name);
        originMdList.push([{ date: new Date(date), value: prescription }]);
      }
    });
  }

  makingcheckBox(originLbLabel, "lb");
  makingcheckBox(originMdLabel, "md");
  allCheck(originLbLabel, "lb");
  allCheck(originMdLabel, "md");
  makingAllList();
}


main();
