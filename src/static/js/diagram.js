
// Инициализация второго графика (bar chart)
let domBar = document.getElementById('diagram');
let myChartBar = echarts.init(domBar, null, {
  renderer: 'svg',
  useDirtyRect: false
});

let optionBar = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] ,
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 1220]
    }
  ]
};

if (optionBar && typeof optionBar === 'object') {
  myChartBar.setOption(optionBar);
}


// Обработчики событий для изменения размера окна
window.addEventListener('resize', function() {
  myChartBar.resize();
});
