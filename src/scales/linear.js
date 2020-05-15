import {scaleLinear} from "d3"
import Scale from "./scale"

export default class LinearScale extends Scale {
  build() {
    return scaleLinear().domain(this._domain())
                        .rangeRound(this._range())
  }

  _domain() {
    return this._dataSetBoundaries()
  }
}