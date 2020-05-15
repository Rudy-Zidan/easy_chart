import lineChart from "./src/charts/lineChart.js"

export default class EasyChart {
  constructor(selector, options = {}) {
    this.selector = selector
    this.options = options
  }

  draw() {
    switch (this.options.type) {
      case 'lineChart':
        new lineChart(this.selector, this.options).draw()
        break;
    }
  }
}

if (window !== undefined) {
  window.EasyChart = EasyChart
}
