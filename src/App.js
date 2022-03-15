import React from 'react';
import './App.css';
import { MyResponsiveLine } from './graph'
import * as d3 from 'd3';
import { data_test } from './data'

const ref = useRef();

useEffect(() =>{
    const currentElement = ref.current;
    const documentElement = d3.select(currentElement)
      .call(g => g.select("svg").remove())
      .append('svg')
      .attr('viewBox', `0,0,${width},${height}`);
}, [data_test])

const anchor = d3.select("a");


class App extends React.Component{
  render(){
    return (
        <>
            <h2> Line Chart </h2>
            <div ref={ref} style={{
                width: '100%',
                height: graphHeight
            }}/>
        </>
    );
  }
}



export default App;
