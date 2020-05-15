import {scaleBand} from "d3"
import Scale from "./scale"

export default class BandScale extends Scale {
  build () {
    return scaleBand().domain(this.dataSet)
                      .range(this._range())
  }
}