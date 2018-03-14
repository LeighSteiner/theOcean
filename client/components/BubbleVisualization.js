import React, { Component } from 'react';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';
import { fetchOneOcean, fetchOceanBubbles } from '../store';

export default class BubbleVisualization extends Component {

//should take ocean bubble props
  componentDidMount(){
   //d3 shit goes here
   if(this.props.oceanBubbles){
    //a radius scale to control radius of bubbles
    //domain is the "raw input" that will be mapped on to a size range
    let radiusScale = d3.scaleSqrt().domain([1, 35]).range([10, 80])

    // a simulation is a collection of forces 
    //detailing where we want our circles to go
    // and how we want them to interact
    //forceX moves us along the x axis to the parameter pt 
    //(often say, width/2)
    //step one: get them to middle
    //step two: avoid collision  --use forceCollide
    //step three: alter radius to represent data: right now it is set
    //to show size based on id, alter later to do time since creation
   	let simulation = d3.forceSimulation()
   	.force("x", d3.forceX(200).strength(0.05))
   	.force("y", d3.forceY(200).strength(0.05))
   	.force("collide", d3.forceCollide((d) => radiusScale(d.id)))

    let bubbles = this.props.oceanBubbles.map((bubble) => {
     let bubbleObj = {
     	id : bubble.id, 
     	date: bubble.createdAt, 
     	message: bubble.message, 
     	userId: bubble.userId
     }
     return bubbleObj
    })
     let circles = d3.select('#bubble-viz').selectAll('circle .bubbles')
   					.data(bubbles)
   					.enter()
  				 	.append('svg:circle')
				   	.attr('class', 'bubbles dim')
				   	.attr('id', (d) => 'bubble-' + d.id)
				   	.attr('r', (d) => radiusScale(d.id))
				   	.style('fill', '#b8c1bb')

   	simulation.nodes(bubbles)
   	  .on('tick', ticked)

   	function ticked(){
   	  circles
   	    .attr('cx',(d) => d.x)
   	    .attr('cy', (d) => d.y)
   	}
   }
  }

  shouldComponentUpdate(){
  	return false;
  }

//for complex updates?
  // componentWillReceiveProps(nextProps){
 // }

  render() {
   return <svg id='bubble-viz' ref='bubble-viz'/>
  }
}