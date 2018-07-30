var localestore_result = [];
var myChart = null;
var currentStart = 0;
var result_Axis = [];
var result_amount = [];
var filename = '20180730.txt';
function CreateAnaylizeChart(result){
    localestore_result = result;
    myChart = echarts.init(document.getElementById('Chart_1'));
    result_Axis = [];
    result_amount = [];
    for(var WordCut in localestore_result.slice(0,15)){
        result_Axis.push(localestore_result[WordCut][0]);
        result_amount.push(localestore_result[WordCut][1]);
    }
    var yMax = Math.ceil(result_amount[0]*1.2);
    var dataShadow = [];
    for(var i=0;i<15;i++){
        dataShadow.push(yMax);
    }
    option = {
    title: {
        text: 'NLP处理后该次无回复问题txt分词统计结果',
        subtext: '每次显示15个'
    },
    xAxis: {
        data: result_Axis,
        axisLabel: {
            inside: true,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: result_amount
        }
    ]
};
    var zoomSize = 6;
    myChart.on('click', function (params) {
    console.log(result_Axis[params.dataIndex]);
    eel.SelectKeyWord(result_Axis[params.dataIndex],filename)(ListOutSentences);
//    myChart.dispatchAction({
//        type: 'dataZoom',
//        startValue: result_Axis[Math.max(params.dataIndex - zoomSize / 2, 0)],
//        endValue: result_Axis[Math.min(params.dataIndex + zoomSize / 2, 15 - 1)]
//        });
    });
    myChart.setOption(option);
    $('#btn1').removeClass('hidden');
    $('#btn2').removeClass('hidden');
    $('#btn3').removeClass('hidden');
    $('#btn4').removeClass('hidden');
}
function ListOutSentences(result){
    var Listresult = [];

    for(var sen in result){
        console.log(result[sen].split('match=\'')[1].split('\'')[0])
    }
}
function FirstFifteenWords(){
    currentStart = 0;
    result_Axis = [];
    result_amount = [];
    for(var WordCut in localestore_result.slice(0,15)){
        result_Axis.push(localestore_result.slice(0,15)[WordCut][0]);
        result_amount.push(localestore_result.slice(0,15)[WordCut][1]);
    }
    var yMax = Math.ceil(result_amount[0]*1.2);
    var dataShadow = [];
    for(var i=0;i<15;i++){
        dataShadow.push(yMax);
    }
    option = {
    title: {
        text: 'NLP处理后该次无回复问题txt分词统计结果',
        subtext: '每次显示15个'
    },
    xAxis: {
        data: result_Axis,
        axisLabel: {
            inside: true,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: result_amount
        }
    ]
};
    var zoomSize = 6;
    myChart.setOption(option);
}
function PreviousFifteenWords(){
    if(currentStart<15){
        currentStart = 0;
    }else{
       currentStart = currentStart - 15;
    }
    result_Axis = [];
    result_amount = [];
    for(var WordCut in localestore_result.slice(currentStart,currentStart+15)){
        result_Axis.push(localestore_result.slice(currentStart,currentStart+15)[WordCut][0]);
        result_amount.push(localestore_result.slice(currentStart,currentStart+15)[WordCut][1]);
    }
    var yMax = Math.ceil(result_amount[0]*1.2);
    var dataShadow = [];
    for(var i=0;i<15;i++){
        dataShadow.push(yMax);
    }
    option = {
    title: {
        text: 'NLP处理后该次无回复问题txt分词统计结果',
        subtext: '每次显示15个'
    },
    xAxis: {
        data: result_Axis,
        axisLabel: {
            inside: true,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: result_amount
        }
    ]
};
    var zoomSize = 6;
    myChart.setOption(option);

}
function NextFifteenWords(){
    if(currentStart>localestore_result.length-16){
        currentStart = localestore_result.length-16;
    }else{
       currentStart = currentStart + 15;
    }
    result_Axis = [];
    result_amount = [];
    for(var WordCut in localestore_result.slice(currentStart,currentStart+15)){
        result_Axis.push(localestore_result.slice(currentStart,currentStart+15)[WordCut][0]);
        result_amount.push(localestore_result.slice(currentStart,currentStart+15)[WordCut][1]);
    }
    var yMax = Math.ceil(result_amount[0]*1.2);
    var dataShadow = [];
    for(var i=0;i<15;i++){
        dataShadow.push(yMax);
    }
    option = {
    title: {
        text: 'NLP处理后该次无回复问题txt分词统计结果',
        subtext: '每次显示15个'
    },
    xAxis: {
        data: result_Axis,
        axisLabel: {
            inside: true,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: result_amount
        }
    ]
};
    var zoomSize = 6;
    myChart.setOption(option);
}
function LastFifteenWords(){
    currentStart = localestore_result.length-16
    result_Axis = [];
    result_amount = [];
    for(var WordCut in localestore_result.slice(-15)){
        result_Axis.push(localestore_result.slice(-15)[WordCut][0]);
        result_amount.push(localestore_result.slice(-15)[WordCut][1]);
    }
    var yMax = Math.ceil(result_amount[0]*1.2);
    var dataShadow = [];
    for(var i=0;i<15;i++){
        dataShadow.push(yMax);
    }
    option = {
    title: {
        text: 'NLP处理后该次无回复问题txt分词统计结果',
        subtext: '每次显示15个'
    },
    xAxis: {
        data: result_Axis,
        axisLabel: {
            inside: true,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: result_amount
        }
    ]
};
    var zoomSize = 6;
    myChart.setOption(option);
}