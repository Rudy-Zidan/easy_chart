import {line} from "d3";

export default class Line {
  constructor(points, xScale, yScale) {
    this.points = points
    this.xScale = xScale
    this.yScale = yScale
  }

  render (svgGroup, cssClass, transform, color) {
    svgGroup.append("path")
            .attr("transform", transform)
            .datum(this.points)
            .attr("class", cssClass)
            .attr("d", this._lineEquation())
            .attr("stroke", color)
            .attr("fill", "none")
            .style("stroke-width", "2px")
            .style("box-shadow", "0px 0px 5px #808080")
  }

  _lineEquation () {
    return line().x(d => this.xScale(d.x))
                 .y(d => this.yScale(d.y))
  }
}