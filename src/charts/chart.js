import * as d3 from "d3";
import LinearScale from "../scales/linear.js";
import Axis from "../axises/axis.js";
import BandScale from "../scales/band.js";
import Config from "../config.js";

export default class Chart {
  constructor(selector, options) {
    this.selector = selector
    this.yScales = []
    this.yAxises = []
    this.options = options
    this.configuration = new Config()
    this._init()
  }

  draw() {
    console.log('you need to implement it.')
  }

  _init() {
    this._buildMargin()
    this._calculateWidth()
    this._calculateHeight()
    this._buildSvg()
    this._buildMainG()
  }

  _getElementWidth() {
    return d3.select(this.selector).style('width').slice(0, -2)
  }

  _getElementHeight() {
    return d3.select(this.selector).style('height').slice(0, -2)
  }

  _buildMargin() {
    this.margin = this.configuration.margin
  }

  _buildScale() {
    this.xScale = new BandScale(this.options.xAxis.data, { orientation: 'bottom', limits: { min: 0, max: this.width } }).build()

    for(var i = 0; i < this.options.yAxises.length; i++) {
      let yScale = new LinearScale(
        this.options.yAxises[i].dataSet, 
        { 
          orientation: this.options.yAxises[i].orientation, 
          limits: { min: this.height, max: this.margin.bottom }
        }
      ).build()
      this.yScales.push(yScale)
    }
  }

  _buildAxises() {
    this.xAxis = new Axis(this.xScale, "bottom")
    this._buildYAxises()
  }

  _buildYAxises() {
    for(var i = 0; i < this.options.yAxises.length; i++) {
      let dataSetCount = this.options.yAxises[i].dataSet.length
      this.yAxises.push(new Axis(this.yScales[i], this.options.yAxises[i].orientation, dataSetCount))
    }
  }

  _buildSvg() {
    this.svg = d3.select(this.selector)
      .append('svg')
      .attr('width', this._getElementWidth())
      .attr('height', this._getElementHeight())
  }

  _calculateWidth() {
    this.width = this._getElementWidth() - this.margin.left - this.margin.right
  }

  _calculateHeight() {
    this.height = this._getElementHeight() - this.margin.top - this.margin.bottom
  }

  _buildMainG() {
    let transform = "translate(" + this.margin.left + "," + this.margin.top + ")"
    this.g = this.svg.append("g")
                     .attr("class", "mainG")
                     .attr("transform", transform);
  }

  _datum(data) {
    let datum = []
    for (let i = 0; i < data.length; i++) {
      datum.push(
        {
          x: this.options.xAxis.data[i],
          y: data[i]
        }
      )
    }
   
    return datum
  }
}