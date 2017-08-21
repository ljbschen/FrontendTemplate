import React from 'react'
import * as d3           from 'd3';
import tip from 'd3-tip';
import {csv} from 'd3-request';
d3.tip = tip;

function getMOS(ssimResult) {
    var ssim_mos = 0;
    if (ssimResult >= 0.99)
        ssim_mos = 5;
    else if (ssimResult >= 0.95)
        ssim_mos = 4 + (ssimResult - 0.95) / 0.04;
    else if (ssimResult >= 0.88)
        ssim_mos = 3 + (ssimResult - 0.88) / 0.07;
    else if (ssimResult >= 0.5)
        ssim_mos = 2 + (ssimResult - 0.5) / 0.38;
    else
        ssim_mos = 1 + ssimResult / 0.5;
    return ssim_mos;
}

class Graph extends React.Component {
    constructor(props) {
        super();
        this.state = {
            xKey: props.xKey,
            yKey: props.yKey,
            width: 0,
            height: 0,
            padding: 100,
            dataPath: "",
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.drawChart = this.drawChart.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth/1.05, height: window.innerHeight/1.05 });
    }

    componentWillReceiveProps(props) {
        console.log("RECEIVED PROPS");
        console.log(props);
        d3.select(this.svg).selectAll("*").remove();
        this.setState({
            xKey: props.xKey,
            yKey: props.yKey,
            dataPath: props.dataPath
        }, this.fetchData);

    }

    fetchData() {
        if (this.state.dataPath !== "")
            csv('http://10.22.160.5:3000/' + this.state.dataPath + '/frame_stats.csv', (error, data) => {
                if (error) {
                    console.log(error);
                }
                this.setState({data: data}, this.drawChart);
            });
    }

    drawChart() {
        let { data, xKey, yKey, width, height, padding, dataPath} = this.state;
        console.log("RENDERING CHART WITH DATE FROM " + dataPath);
        console.log(data);
        if (yKey === 'mos') {
            data.forEach(d => {d['mos'] = getMOS(d['mos'])});
        }
        // Returns the largest X coordinate from the data set
        var xMax = (data, key)  => d3.max(data, (d) => d[key]);

        // Returns the higest Y coordinate from the data set
        var yMax = (data, key)  => d3.max(data, (d) => d[key]);

        var xScale = d3.scaleLinear()
            .domain([0, 600])
            .range([padding, width - padding]);

        var yScale = d3.scaleLinear()
            .domain([0, yMax(data, yKey)])
            .range([height - padding, padding]);


        var yAxis = d3.axisLeft(yScale);
        var xAxis = d3.axisBottom(xScale);

        var line = d3.line()
            .x(function(d) { return xScale(d[xKey]); })
            .y(function(d) { return yScale(d[yKey]); });

        //Mouseover tip
        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .direction(function(){
                let direction = 'n'
                let y = this.getAttribute("cy")-padding;
                let x = this.getAttribute("cx")-(padding*4);
                let w = (height-padding)/2;
                let h = (height-padding)/2;
                if (x < w && y < h) direction = 'se';
                if (x < w && y > h) direction = 'ne';
                if (x > w && y > h) direction = 'nw';
                if (x > w && y < h) direction = 'sw';
                console.log(`direction: ${direction} x: ${x} y:${y} width: ${w} height:${h}`);
                return direction;
            })
            .html(function (d) {
                console.log(Number(d['frame_num'])+1)
                var n = Number(d[xKey])+1;
                var leadZero = "000";
                if (n > 99) {
                    leadZero = "0";
                } else if (n > 9) {
                    leadZero = "00";
                }
                var imageSrc = leadZero + n + ".jpg"
                console.log(imageSrc);
                return "<img src='http://10.22.160.5:3000/" + dataPath + "/out/" + imageSrc + "' width=1100 height=520/>";
            });

        var svg = d3.select(this.svg);
        svg.call(tip);

        svg.append("g");

        // Append Title
        svg.append("text")
            .attr("class", "graphtitle")
            .attr("y", padding-30)
            .attr("x", width / 2)
            .style("text-anchor", "middle")
            .attr("font-size", 40)
            .attr("stroke", "black")
            .attr("fill", "black")
            .text(yKey + " VS. Frame Number");

        // Append Line Graph
        svg.append("path")
            .attr("d", line(data))
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "steelblue");

        // Append Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + padding +", 0)").call(yAxis)
            .append("text")
            .attr("class", "ylabel")
            .attr("y", -100) // x and y switched due to rotation!!
            .attr("x", -height/2)
            .style("text-anchor", "middle")
            .attr("dy", "1em")
            .attr("transform", "rotate(-90)")
            .attr("font-size", 20)
            .attr("stroke", "black")
            .attr("fill", "black")
            .text(yKey);

        // Append X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height - padding) + ")").call(xAxis)
            .append("text")
            .attr("class", "xlabel")
            .attr("text-anchor", "middle")
            .attr("x", width/2)
            .attr("y", 35)
            .style("text-anchor", "middle")
            .attr("font-size", 20)
            .attr("stroke", "black")
            .attr("fill", "black")
            .text("Frame Number");

        // Append Circles
        svg.append("g")
            .attr("class", "circles")
            .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr('cx', function (d) {
                    return xScale(d[xKey]);
                })
                .attr('cy', function (d) {
                    return yScale(d[yKey]);
                })
                .attr('r', 1)
                .attr('fill', 'white')
                .attr('stroke', 'steelblue')
                .attr('stroke-width', '2')
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
    }

    render() {
        if (this.state.data === undefined) {
            return ( <h1>NO DATA</h1>
            )
        } else {
            return (
                <svg ref={(elem) => {this.svg = elem}} width={this.state.width} height={this.state.height}>
                </svg>
            )
        }

    }
}

export default Graph;
