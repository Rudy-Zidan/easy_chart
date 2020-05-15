export default class Circle {
  constructor(points, xScale, yScale, radius, yAxisIndex, label) {
    this.points = points
    this.xScale = xScale
    this.yScale = yScale
    this.radius = radius
    this.yAxisIndex = yAxisIndex
    this.label = label
  }

  render (svgGroup, cssClass, transform, color) {
    svgGroup.append('g')
            .selectAll("circle")
            .data(this.points)
            .enter()
            .append("circle")
            .attr("transform", transform)
            .attr("class", cssClass)
            .attr("cx", d => this.xScale(d.x))
            .attr("cy", d => this.yScale(d.y))
            .attr("label", this.label)
            .attr("r", this.radius)
            .attr("fill", color)
            .attr("yAxis", this.yAxisIndex)
  }
}