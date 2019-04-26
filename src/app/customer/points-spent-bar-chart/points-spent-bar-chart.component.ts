import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { PointsData } from 'src/app/models/chart-data.model';

@Component({
  selector: 'app-points-spent-bar-chart',
  templateUrl: './points-spent-bar-chart.component.html',
  styleUrls: ['./points-spent-bar-chart.component.css']
})
export class PointsSpentBarChartComponent implements OnInit {
  @Input()
  data: PointsData[];

  constructor() { }

  ngOnInit() { }

  ngOnChanges(): void {
    if (!this.data) { return; }
    console.log(this.data);

    this.createChart();
  }

private createChart(): void {
  const margin = {top: 30, right: 30, bottom: 70, left: 60};
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
  const svg = d3.select('#bar-chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');


// sort data
  this.data.sort((b, a) => {
    return a.points - b.points;
  });


// X axis
  const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(this.data.map(d => d.provider))
  .padding(0.2);
  svg.append('g')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x))
  .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-45)')
    .style('text-anchor', 'end');

// Add Y axis
  const y = d3.scaleLinear()
  .domain([0, 100])
  .range([ height, 0]);
  svg.append('g')
  .call(d3.axisLeft(y));

// Bars
  svg.selectAll('mybar')
  .data(this.data)
  .enter()
  .append('rect')
    .attr('x', d => x(d.provider))
    .attr('width', x.bandwidth())
    .attr('fill', '#69b3a2')
     // no bar at the beginning thus:
    .attr('height', d => height - y(0)) // always equal to 0
    .attr('y', d => y(0));

    // Animation
  svg.selectAll('rect')
  .transition()
  .duration(800)
  .attr('y', d => y(d.points))
  .attr('height', d => height - y(d.points))
  .delay((d, i) => {console.log(i) ; return(i * 100); });

}

// A function that create / update the plot for a given variable:
// update(data) {

//   // Update the X axis
//   x.domain(data.map(function(d) { return d.group; }));
//   xAxis.call(d3.axisBottom(x));

//   // Update the Y axis
//   y.domain([0, d3.max(data, function(d) { return d.value; }) ]);
//   yAxis.transition().duration(1000).call(d3.axisLeft(y));

//   // Create the u variable
//   let u = svg.selectAll('rect')
//     .data(data);

//   u
//     .enter()
//     .append('rect') // Add a new rect for each new elements
//     .merge(u) // get the already existing elements as well
//     .transition() // and apply changes to all of them
//     .duration(1000)
//       .attr('x', function(d) { return x(d.group); })
//       .attr('y', function(d) { return y(d.value); })
//       .attr('width', x.bandwidth())
//       .attr('height', function(d) { return height - y(d.value); })
//       .attr('fill', '#69b3a2');

//   // If less group in the new dataset, I delete the ones not in use anymore
//   u
//     .exit()
//     .remove();
// }

}
