var localestore_result = [];
var myChart = null;
var currentStart = 0;
var result_Axis = [];
var result_amount = [];
var filename = null;
function CountPercantage() {
    var TotalNumber = 0;
    var Max_5 = [];
    for (var a in localestore_result) {
        if (a <= 5) {
            Max_5.push({'word': localestore_result[a][0], 'amount': localestore_result[a][1]});
            console.log(localestore_result[a]);
        }
        TotalNumber = TotalNumber + localestore_result[a][1];
        // console.log(TotalNumber);
    }
    console.log(TotalNumber);
    console.log(Max_5);
    for (var x in Max_5) {
        Max_5[x]['per'] = ((Max_5[x]["amount"] / TotalNumber) * 100 + '%');
    }
    console.log(Max_5);
}

function CreateAnaylizeChart(result) {
    localestore_result = result;
    myChart = echarts.init(document.getElementById('Chart_1'));
    result_Axis = [];
    result_amount = [];
    for (var WordCut in localestore_result.slice(0, 15)) {
        result_Axis.push(localestore_result[WordCut][0]);
        result_amount.push(localestore_result[WordCut][1]);
    }
    var yMax = Math.ceil(result_amount[0] * 1.2);
    var dataShadow = [];
    for (var i = 0; i < 15; i++) {
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
                barGap: '-100%',
                barCategoryGap: '40%',
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
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: result_amount
            }
        ]
    };
    var zoomSize = 6;
    myChart.on('click', function (params) {
        // console.log(result_Axis[params.dataIndex]);
        eel.SelectKeyWord(result_Axis[params.dataIndex], filename)(ListOutSentences);
        eel.CountRelation(result_Axis[params.dataIndex], filename)(GetRelation);
        $('#myModalLabel').text(result_Axis[params.dataIndex] + '与其他关键字分词关系分析');
        $('#btn_add_stopword').attr('value', result_Axis[params.dataIndex]);
        $('#btn_addYysWordList').attr('value', result_Axis[params.dataIndex]);
        $('#myModal').modal({backdrop: 'static', keyboard: false});
        $('#myModal').modal('show');
        $('#myModalLoading').modal({backdrop: 'static', keyboard: false});
        $('#myModalLoading').modal('show');
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
    $('#myModalLoading').modal('hide');
}

var resultList = [{sentence: 'test1'}, {sentence: 'test2'}];
var vm = new Vue({
    el: '#ResultList',
    data: {
        resultList: resultList
    }
});
var resultList2 = [{sentence: 'test1'}, {sentence: 'test2'}];
var vm = new Vue({
    el: '#ResultList2',
    data: {
        resultList: resultList2
    }
});
var getRandomColor = function () {
    return '#' + (Math.random() * 0xffffff << 0).toString(16);
};
var json;

var t_word1;
var t_word2;

function GetRelation(result) {
    // console.log(result);
    var myChart_2 = echarts.init(document.getElementById('Chart_2'));
    json = {
        "nodes": [

            {
                "color": getRandomColor(),
                "label": "underscore",
                "attributes": {},
                "y": -700 * Math.random() + 700 * Math.random(),
                "x": -700 * Math.random() + 700 * Math.random(),
                "id": "underscore",
                "size": 100.0
            },
            {
                "color": getRandomColor(),
                "label": "faye",
                "attributes": {},
                "y": -700 * Math.random() + 700 * Math.random(),
                "x": -700 * Math.random() + 700 * Math.random(),
                "id": "faye",
                "size": 0.67816025
            },
            {
                "color": getRandomColor(),
                "label": "socket.io",
                "attributes": {},
                "y": -700 * Math.random() + 700 * Math.random(),
                "x": -700 * Math.random() + 700 * Math.random(),
                "id": "socket.io",
                "size": 19.818306
            }
        ],
        "edges": [
            {
                "sourceID": "underscore",
                "attributes": {},
                "targetID": "faye",
                "size": 1
            },
            {
                "sourceID": "underscore",
                "attributes": {},
                "targetID": "socket.io",
                "size": 1
            },
            {
                "sourceID": "socket.io",
                "attributes": {},
                "targetID": "underscore",
                "size": 1
            },
            {
                "sourceID": "socket.io",
                "attributes": {},
                "targetID": "faye",
                "size": 1
            }
        ]
    };
    var keyword = null;
    var MaxNumber = null;
    var MaxRelationNumber = result[0][1];
    json = {"nodes": [], "edges": []};
    for (var a in result) {
        if (result[a][1] == 0) {
            keyword = result[a][0];
            MaxNumber = result[a][1];
            break;
        }
    }
    for (var a in result) {
        if (result[a][1] == 0) {
            json["nodes"].push({
                "color": getRandomColor(),
                "label": keyword,
                "attributes": {},
                "y": 0,
                "x": 0,
                "id": keyword,
                "size": 40
            });
        }
        else if(result[a][0] !== " "){
            json["nodes"].push({
                "color": getRandomColor(),
                "label": result[a][0],
                "attributes": {},
                "y": -700 * Math.random() + 700 * Math.random() + 50,
                "x": -700 * Math.random() + 700 * Math.random() + 50,
                "id": result[a][0],
                "size": Math.ceil(result[a][1]*40/MaxRelationNumber)
            });
            json["edges"].push({
                "sourceID": keyword,
                "attributes": {},
                "targetID": result[a][0],
                "size": 1
            });
        }
    }
    myChart_2.setOption(option = {
        title: {
            text: '\"'+keyword+'\"分词与其他分词关系'
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                // progressiveThreshold: 700,
                data: json.nodes.map(function (node) {
                    return {
                        x: node.x,
                        y: node.y,
                        id: node.id,
                        name: node.label,
                        symbolSize: node.size,
                        itemStyle: {
                            normal: {
                                color: node.color
                            }
                        }
                    };
                }),
                edges: json.edges.map(function (edge) {
                    return {
                        source: edge.sourceID,
                        target: edge.targetID
                    };
                }),
                label: {
                    emphasis: {
                        position: 'right',
                        show: true
                    }
                },
                roam: true,
                focusNodeAdjacency: true,
                lineStyle: {
                    normal: {
                        width: 0.5,
                        curveness: 0.3,
                        opacity: 0.7
                    }
                }
            }
        ]
    }, true);
    myChart_2.on('click', function (params) {
        // console.log(params);
        t_word1 = params.data.name;
        t_word2 = keyword;
        // console.log(t_word1);
        // console.log(t_word2);
        if (params.data.source === undefined) {
            eel.TwoWordSentence(filename, params.data.name, keyword)(PrintOutTwoWordSentence);
            console.log("targetGet");
        } else {
            t_word1 = params.data.target;
            eel.TwoWordSentence(filename, params.data.source, params.data.target)(PrintOutTwoWordSentence);
        }
    });
    $('#myModalLoading').modal('hide');
}

function PrintOutTwoWordSentence(result) {
    for (var a in result) {
        console.log(result[a]);
    }
    $('#myModal2Label').text('同时存在\"'+ t_word1 + '\"和\"' + t_word2 +'\"两个分词结果的回复');
    $('#myModal2').modal({backdrop: 'static', keyboard: false});
    $('#myModal2').modal('show');
    $('#CheckSecondWord').text("\""+t_word1+"\""+"->查看该词的分析");
    ListOutSentences2(result);
}

function ListOutSentences(result) {
    var length = resultList.length;
    for (var a = 0; a < length; a++) {
        resultList.pop();
    }
    for (var sen in result) {
        try {
            resultList.push({'sentence': result[sen].split('match=\'')[1].split('\'')[0]});
        } catch (error) {
            resultList2.push({'sentence': result[sen]});
        }
    }
}

function ListOutSentences2(result){
    var length = resultList2.length;
    for (var a = 0; a < length; a++) {
        resultList2.pop();
    }
    for (var sen in result) {
        try {
            resultList2.push({'sentence': result[sen].split('match=\'')[1].split('\'')[0]});
        } catch (error) {
            resultList2.push({'sentence': result[sen]});
        }
    }
}

function FirstFifteenWords() {
    currentStart = 0;
    result_Axis = [];
    result_amount = [];
    for (var WordCut in localestore_result.slice(0, 15)) {
        result_Axis.push(localestore_result.slice(0, 15)[WordCut][0]);
        result_amount.push(localestore_result.slice(0, 15)[WordCut][1]);
    }
    var yMax = Math.ceil(result_amount[0] * 1.2);
    var dataShadow = [];
    for (var i = 0; i < 15; i++) {
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
                barGap: '-100%',
                barCategoryGap: '40%',
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
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: result_amount
            }
        ]
    };
    var zoomSize = 6;
    myChart.setOption(option);
}

function PreviousFifteenWords() {
    if (currentStart < 15) {
        currentStart = 0;
    } else {
        currentStart = currentStart - 15;
    }
    result_Axis = [];
    result_amount = [];
    for (var WordCut in localestore_result.slice(currentStart, currentStart + 15)) {
        result_Axis.push(localestore_result.slice(currentStart, currentStart + 15)[WordCut][0]);
        result_amount.push(localestore_result.slice(currentStart, currentStart + 15)[WordCut][1]);
    }
    var yMax = Math.ceil(result_amount[0] * 1.2);
    var dataShadow = [];
    for (var i = 0; i < 15; i++) {
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
                barGap: '-100%',
                barCategoryGap: '40%',
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
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: result_amount
            }
        ]
    };
    var zoomSize = 6;
    myChart.setOption(option);

}

function NextFifteenWords() {
    if (currentStart > localestore_result.length - 16) {
        currentStart = localestore_result.length - 16;
    } else {
        currentStart = currentStart + 15;
    }
    result_Axis = [];
    result_amount = [];
    for (var WordCut in localestore_result.slice(currentStart, currentStart + 15)) {
        result_Axis.push(localestore_result.slice(currentStart, currentStart + 15)[WordCut][0]);
        result_amount.push(localestore_result.slice(currentStart, currentStart + 15)[WordCut][1]);
    }
    var yMax = Math.ceil(result_amount[0] * 1.2);
    var dataShadow = [];
    for (var i = 0; i < 15; i++) {
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
                barGap: '-100%',
                barCategoryGap: '40%',
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
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: result_amount
            }
        ]
    };
    var zoomSize = 6;
    myChart.setOption(option);
}

function LastFifteenWords() {
    currentStart = localestore_result.length - 16
    result_Axis = [];
    result_amount = [];
    for (var WordCut in localestore_result.slice(-15)) {
        result_Axis.push(localestore_result.slice(-15)[WordCut][0]);
        result_amount.push(localestore_result.slice(-15)[WordCut][1]);
    }
    var yMax = Math.ceil(result_amount[0] * 1.2);
    var dataShadow = [];
    for (var i = 0; i < 15; i++) {
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
                barGap: '-100%',
                barCategoryGap: '40%',
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
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: result_amount
            }
        ]
    };
    var zoomSize = 6;
    myChart.setOption(option);
}


function AddToStopWordList() {
    // console.log($('#btn_add_stopword').val());
    eel.AddToStopWordList($('#btn_add_stopword').val());
    alert($('#btn_add_stopword').val() + '  已被加入停用词列表');
}

function AddToYysWordList() {
    // console.log($('#btn_addYysWordList').val());
    eel.AddToYYSKeyWordList($('#btn_addYysWordList').val());
    alert($('#btn_addYysWordList').val() + '  已被加入用户词典');
}


function GoToAnaylize() {
    try {
        filename = $('#file_position')[0].files[0].name;
    }catch(error){
        alert('请选择文件！');
        return;
    }
    filename ='..\\Anaylize\\' + filename;
    console.log(filename);
    $('#myModalLoading').modal({backdrop: 'static', keyboard: false});
    $('#myModalLoading').modal('show');
    $('#StartPage').addClass("hidden");
    $('#StartPage').addClass("hidden");
    eel.Anaylize(filename)(CreateAnaylizeChart);
}

function CheckSecondeWordFromModal(){
    var second_target = t_word1;
    $('#myModal').modal('hide');
    $('#myModal2').modal('hide');
    eel.SelectKeyWord(second_target, filename)(ListOutSentences);
    eel.CountRelation(second_target, filename)(GetRelation);
    $('#myModalLabel').text(second_target + '与其他关键字分词关系分析');
    $('#btn_add_stopword').attr('value', second_target);
    $('#btn_addYysWordList').attr('value', second_target);
    $('#myModal').modal({backdrop: 'static', keyboard: false});
    $('#myModal').modal('show');
}