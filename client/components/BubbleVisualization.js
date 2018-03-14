import React, { Component } from 'react';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';
import { fetchOneOcean, fetchOceanBubbles } from '../store';

export default class BubbleVisualization extends Component {

//should take ocean bubble props
  componentDidMount(){
   //d3 shit goes here
   if(this.props.oceanBubbles){
   	d3.select('#bubble-viz').selectAll('circle .bubbles')
   	.data(this.props.oceanBubbles)
   	.enter()
   	.append('svg:circle')
   	.attr('class', 'bubbles')
   	.attr('r', '30')
   	.attr('cx', '100')
   	.attr('cy', '100')
   	.style('fill', 'black')
   }
  }

  shouldComponentUpdate(){
  	return false;
  }

  componentWillReceiveProps(nextProps){

  }

  render() {
  	console.log('viz props', this.props.oceanBubbles)
   return <svg id='bubble-viz' ref='bubble-viz'/>
  }
}