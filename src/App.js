// currently learning from https://blog.griddynamics.com/using-d3-js-with-react-js-an-8-step-comprehensive-manual/

import React from 'react';
import './App.css';
import LineChart from "./views/LineChart";

import data_a from "./sample1.json"
import data_b from "./sample2.json"
import data_c from "./sample3.json"


const firstData = {
    name: "Example1",
    color: "#ffffff",
    items: data_a.map((d) => ({ ...d, date: new Date(d.date)}))
}

const secondData = {
    name: "Example2",
    color: "#d53e4f",
    items: data_b.map((d) => ({ ...d, date: new Date(d.date)}))
}

const thirdData = {
    name: "Example3",
    color: "#5e4fa2",
    items: data_c.map((d) => ({ ...d, date: new Date(d.date)}))
}

const dimensions = {
    width: 600,
    height: 300,
    margin: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 60
    }
}


export default function App() {
    return (
        <div className="App">
            <LineChart
                data={[firstData, secondData, thirdData]}
                dimensions={dimensions}
            />
        </div>
    )
}
