let option = {
  color: ["#1990FE", "#DCE4EB"],
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["本月数据", "上个月数据"],
    icon: "rect",
    itemGap: 50,
    itemWidth: 20,
    itemHeight: 2,
    bottom: 0,
    selectedMode: false,
  },
  dataZoom: {
    start: 0,
    type: "inside",
    end: 40,
  },
  grid: {
    top: "10%",
    left: "3%",
    right: "4%",
    bottom: "15%",
  },
  xAxis: {
    boundaryGap: true,
    data: [],
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    axisLabel: {
      margin: 16,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
  },
  series: [
    {
      name: "本月数据",
      type: "line",
      data: [],
      symbol: "circle",
      symbolSize: 8,
      label: {
        show: true,
        formatter: function (params) {
          let arr = [];
          let diff = params.data.diff || 0;
          let data = params.data.value || params.value;
          arr.push(`{c|${data}台}`);
          if (diff >= 0) {
            arr.push(`{a|(${diff > 0 ? "+" : ""}${diff})}`);
          } else {
            arr.push(`{b|(${diff})}`);
          }
          arr.push(`{b|}`);
          return arr.join("");
        },
        rich: {
          a: {
            color: "#FFD55F",
          },
          b: {
            color: "#F1403C",
          },
          c: {
            color: "#1990FE",
          },
        },
      },
      zlevel: 100,
      markPoint: {
        data: [
          {
            type: "max",
            name: "Max",
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,255,255,0.2)", // 0% 处的颜色
                  },
                  {
                    offset: 0.51,
                    color: "rgba(25,144,254,0.2)", // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,255,255,0.2)",
                  },
                ],
              },
            },
          },
          {
            type: "min",
            name: "Min",
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,255,255,0.2)", // 0% 处的颜色
                  },
                  {
                    offset: 0.51,
                    color: "rgba(241,64,60,0.2)", // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,255,255,0.2)",
                  },
                ],
              },
            },
          },
        ],
        label: {
          show: false,
        },
        symbol: "rect",
        symbolSize: [24, 68],
      },
    },
    {
      name: "上个月数据",
      type: "line",
      data: [],
      symbol: "circle",
      symbolSize: 8,
      zlevel: 1,
    },
  ],
};
