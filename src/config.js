export default class Config {
  constructor() {
    this._configureMargin()
    this._configureSize()
    this._configureOpacity()
  }

  _configureMargin() {
    this.margin = { top: 0, right: 20, bottom: 20, left: 15 }
  }

  _configureSize() {
    this.size = 4
    this.maxSize = 6
  }

  _configureOpacity() {
    this.opacity = 0.95
    this.zeroOpacity = 0
    this.fullOpacity = 1
  }
}