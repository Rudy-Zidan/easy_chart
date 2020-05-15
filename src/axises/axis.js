import {axisBottom, axisLeft} from "d3"

export default class Axis {
  constructor(scale, orientation, count = 0) {
    this.scale = scale
    this.orientation = orientation
    this.count = count
    this._buildAxis()
  }

  render(svgGroup, cssClass, transform) {
    svgGroup.append("g")
            .attr("class", cssClass)
            .attr("transform", transform)
            .attr("dataSetCount", this.count)
            .call(this.axis)
  }

  _buildAxis() {
    let d3Axis = null

    switch (this.orientation) {
      case "bottom":
        d3Axis = axisBottom()
        break
      case "left":
        d3Axis = axisLeft()
        break
    }

    this.axis = d3Axis.scale(this.scale)
  }
}