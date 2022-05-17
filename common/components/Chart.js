import * as echarts from 'echarts';
import { useEffect } from 'react';

function Chart({list}) {
    list = [...list]
    list.forEach(i => {
        i.date = new Date(i.date).toLocaleDateString()
    })
    const unique = (arr) => Array.from(new Set(arr))
    const times = unique(list.map(i => i.date)).reverse()

    function getSeries() {
        const xs = unique(list.map(i => i.name))

        return xs.map(x => {
            const xCollection = list.filter(l => l.name === x)
            return {
                name: x,
                type: 'bar',
                stack: 'total',
                label: { show: true },
                emphasis: { focus: 'series' },
                data: times.map(t => {
                    const r = xCollection.find(x => x.date === t)
                    return r && r.count * r.price / 10000
                })
            }
        })
    }
    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts'));
        // 绘制图表
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                  // Use axis to trigger tooltip
                  type: 'line' // 'shadow' as default; can also be 'line' or 'shadow'
                },
                formatter(params, trigger, cb) {
                    return params[0].name + '<br/>'
                        + params.filter(p => p.value).map(p => `${p.seriesName}: ${p.value}`).join('<br />')
                }
              },
              legend: {
                  // type: 'scroll',
                  // orient: 'vertical',
                  bottom: 42
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '13%',
                containLabel: true
              },
              yAxis: {
                type: 'value'
              },
              xAxis: {
                type: 'category',
                data: times,
                axisLabel: {
                    interval: 0,
                    rotate: 45
                },
              },
              series: getSeries(),
              dataZoom: [{
                  type: 'slider',
                  show: true
              }]
        };
        console.log(option)
        myChart.setOption(option)
    })
    
    return <div id="echarts" style={{height: '800px', width: '100%'}}></div>
}

export default Chart