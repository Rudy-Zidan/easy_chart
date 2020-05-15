import Chart from './chart.js'
import {select, selectAll} from "d3";
import Line from '../shapes/line.js';
import Circle from '../shapes/circle.js';
import Tooltip from '../utils/tooltip.js';

export default class LineChart extends Chart {
  draw() {
    this._buildScale();
    this._buildAxises();
    this._render();
  }

  _render() {
    this._renderXAxis()
    this._renderYAxises()

    
    let radius = this.configuration.size
    let transform = this._transform()

    for(var i = 0; i < this.yAxises.length; i++) {
      let yAxis = this.options.yAxises[i]
      for(var j = 0; j < yAxis.dataSet.length; j++) {
        let datum = this._datum(yAxis.dataSet[j].data)
        let line = new Line(datum, this.xScale, this.yScales[i])
        line.render(this.g, "line-"+j, transform, yAxis.dataSet[j].color)
        
        let circle = new Circle(datum, this.xScale, this.yScales[i], radius, i, yAxis.dataSet[j].name)
        circle.render(this.g, "circle-" + j, transform, yAxis.dataSet[j].color)
      }
    }

    new Tooltip(this.g, "circle").wrap()
  }

  _renderXAxis() {
    this.xAxis.render(this.g, "xAxis", "translate(" + this.margin.left + "," + this.height + ")")
  }

  _renderYAxises() {
    for(var i = 0; i < this.yAxises.length; i++) {
      this.yAxises[i].render(this.g, "yAxis-" + i, "translate(" + this.margin.left + ", 0)")
    }
  }

  _transform() {
    let ticks = this.g.select(".xAxis").selectAll('.tick')
    let transform = select(ticks._groups[0][0]).attr("transform")
    let tranformInfo = transform.match(/translate\(([0-9\.]*)/)

    return "translate(" + (parseInt(tranformInfo[1]) + this.margin.left) + ", 0)"
  }
}