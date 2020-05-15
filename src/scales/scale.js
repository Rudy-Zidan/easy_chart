import {min, max} from "d3"

export default class Scale {
  constructor(dataSet, options) {
    this.dataSet = dataSet
    this.options = options
  }

  _range() {
    switch (this.options.orientation) {
      case 'bottom':
        return [this.options.limits.min, this.options.limits.max]
      case 'left':
        return [this.options.limits.min, this.options.limits.max]
    }
  }

  _dataSetBoundaries() {
    let minValue = min(this.dataSet[0].data)
    let maxValue = max(this.dataSet[0].data)
    
    for(var i = 1; i < this.dataSet.length; i++) {
      let nextPossibleMin = min(this.dataSet[i].data)
      let nextPossibleMax = max(this.dataSet[i].data)

      if ( minValue > nextPossibleMin) {
        minValue = nextPossibleMin
      }

      if(maxValue < nextPossibleMax) {
        maxValue = nextPossibleMax
      }
    }

    return [minValue, maxValue]
  }
}