import {event, select, selectAll} from "d3"
import Config from "../config.js";

class TooltipController {
  constructor(element, data) {
    this.element = element
    this.yAxisIndex = select(this.element).attr("yAxis")
    this.xValue = data.x
    this.tagName = select(this.element).node().tagName
    this.dataSetCount = select(".yAxis-" + this.yAxisIndex).attr("dataSetCount")
    this.configuraiton = new Config()
    this._setTitle()
  }

  show() {
    this._increaseSize(select(this.element), "r")
    for(let i = 0; i < this.dataSetCount; i++) {
      let svgObject = selectAll("." + this.tagName + "-" + i).filter(data => data.x === this.xValue)
      if (svgObject.node() === null) {
        continue
      }
      let data = svgObject.data()[0]
      this.innerHtml += "<br/>"
      this.innerHtml +=  "<text style='color: " + svgObject.attr("fill") + "'>" + svgObject.attr("label") + ":</text> " + data.y
      this._increaseSize(svgObject, "r")
    }
    this._showTooltip()
  }

  hide() {
    select('.tooltip').style('opacity', this.configuraiton.zeroOpacity)
    this._decreaseSize(select(this.element), "r")
    for(let i = 0; i < this.dataSetCount; i++) {
      let svgObject = selectAll("." + this.tagName + "-" + i).filter(data => data.x === this.xValue)
      this._decreaseSize(svgObject, "r")
    }
  }

  _increaseSize(element, attr) {
    element.attr(attr, this.configuraiton.maxSize)
  }

  _decreaseSize(element, attr) {
    element.attr(attr, this.configuraiton.size)
  }

  _setTitle() {
    this.innerHtml = this.xValue
  }

  _showTooltip() {
    select('.tooltip').html(this.innerHtml)
                      .style("left", (event.pageX + 10) + "px")		
                      .style("top", (event.pageY - 28) + "px")
                      .style("opacity", this.configuraiton.opacity)
  }
}

export default class Tooltip {
  constructor(svgGroup, selector) {
    this.svgGroup = svgGroup
    this.selector = selector
    this.configuraiton = new Config()
    this._appendTooltipDiv()
  }

  wrap () {
    this.svgGroup.selectAll(this.selector)
                 .on("mouseover", this._mouseover)
                 .on("mouseout", this._mouseout)
  }

  _appendTooltipDiv () {
    select('body').append('div')
                  .attr("class", "tooltip")
                  .style("opacity", this.configuraiton.zeroOpacity)
                  .style("position", "absolute")
                  .style("text-align", "left")
                  .style("padding", "10px")
                  .style("font-size", "12px roboto")
                  .style("background", "#ffffff")
                  .style("border", "1px #808080")
                  .style("border-radius", "10px")
                  .style("box-shadow", "0px 0px 15px #808080")
                  .style("pointer-events", "none")
  }

  _mouseover (data) {
    new TooltipController(this, data).show()
  }

  _mouseout (data) {
    new TooltipController(this, data).hide()
  }
}