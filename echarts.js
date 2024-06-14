let option = {
  color: ["#1990FE", "#DCE4EB"],
  tooltip: {
    trigger: "axis",
    backgroundColor: "#333333",
    padding: [10, 12],
    formatter: (params) => {
      if (params.length === 0) {
        return;
      }
      let result;
      let hasCur = params[0] && params[0].seriesName === "本月数据";
      let hasLast =
        params[0].seriesName === "上个月数据" ||
        (params[1] && params[1].seriesName === "上个月数据");
      result =
        `<div style="width:${
          hasCur && hasLast ? "270px" : "150px"
        };display:flex;justify-content:space-between;margin-bottom:3px;color:#FFD55F;font-weight:600">` +
        '<div style="width:100px">' +
        `${this.reqType === 1 ? "签单" : "发车"}数量（台）` +
        "</div>" +
        `${
          hasCur
            ? '<div style="flex:1;text-align:center">' +
              moment(params[0].data.dayDate).format("M月D日") +
              "</div>"
            : ""
        } ` +
        `${
          hasLast
            ? '<div style="flex:1;text-align:center">' +
              moment(
                hasCur ? params[1].data.dayDate : params[0].data.dayDate
              ).format("M月D日") +
              "</div>"
            : ""
        }` +
        `${
          hasCur && hasLast
            ? '<div style="flex:1;text-align:center">' + "差值</div>"
            : ""
        }` +
        "</div>";
      result +=
        `<div style="width:${
          hasCur && hasLast ? "270px" : "150px"
        };display:flex;justify-content:space-between;margin-bottom:3px;">` +
        '<div style="width:100px">' +
        "总数" +
        "</div>" +
        `${
          hasCur
            ? '<div style="flex:1;text-align:center">' +
              params[0].value +
              "</div>"
            : ""
        }` +
        `${
          hasLast
            ? '<div style="flex:1;text-align:center">' +
              (hasCur ? params[1].value : params[0].value) +
              "</div>"
            : ""
        }` +
        `
                    ${
                      hasCur && hasLast
                        ? '<div style="flex:1;text-align:center">' +
                          (params[0].value - params[1].value > 0 ? "+" : "") +
                          (params[0].value - params[1].value) +
                          "</div>"
                        : ""
                    }
                    ` +
        "</div>";
      result +=
        `<div style="width:${
          hasCur && hasLast ? "270px" : "150px"
        };display:flex;justify-content:space-between;margin-bottom:3px;">` +
        '<div style="width:100px">' +
        "关键客户" +
        "</div>" +
        `
                    ${
                      hasCur
                        ? '<div style="flex:1;text-align:center">' +
                          params[0].data.importantCount +
                          "</div>"
                        : ""
                    }` +
        `${
          hasLast
            ? '<div style="flex:1;text-align:center">' +
              (hasCur
                ? params[1].data.importantCount
                : params[0].data.importantCount) +
              "</div>"
            : ""
        }` +
        `${
          hasCur && hasLast
            ? '<div style="flex:1;text-align:center">' +
              (params[0].data.importantCount - params[1].data.importantCount > 0
                ? "+"
                : "") +
              (params[0].data.importantCount - params[1].data.importantCount) +
              "</div>"
            : ""
        }` +
        "</div>";
      result +=
        `<div style="width:${
          hasCur && hasLast ? "270px" : "150px"
        };display:flex;justify-content:space-between;margin-bottom:3px;">` +
        '<div style="width:100px">' +
        "非关键客户" +
        "</div>" +
        `
                    ${
                      hasCur
                        ? '<div style="flex:1;text-align:center">' +
                          params[0].data.unimportantCount +
                          "</div>"
                        : ""
                    }` +
        `${
          hasLast
            ? '<div style="flex:1;text-align:center">' +
              (hasCur
                ? params[1].data.unimportantCount
                : params[0].data.unimportantCount) +
              "</div>"
            : ""
        }` +
        `${
          hasCur && hasLast
            ? '<div style="flex:1;text-align:center">' +
              (params[0].data.unimportantCount -
                params[1].data.unimportantCount >
              0
                ? "+"
                : "") +
              (params[0].data.unimportantCount -
                params[1].data.unimportantCount) +
              "</div>"
            : ""
        }` +
        "</div>";
      result +=
        `<div style="width:${
          hasCur && hasLast ? "270px" : "150px"
        };display:flex;justify-content:space-between;margin-bottom:3px;">` +
        '<div style="width:100px">' +
        "非目标" +
        "</div>" +
        `${
          hasCur
            ? '<div style="flex:1;text-align:center">' +
              params[0].data.nonTargetCount +
              "</div>"
            : ""
        }` +
        `${
          hasLast
            ? '<div style="flex:1;text-align:center">' +
              (hasCur
                ? params[1].data.nonTargetCount
                : params[0].data.nonTargetCount) +
              "</div>"
            : ""
        }` +
        `${
          hasCur && hasLast
            ? '<div style="flex:1;text-align:center">' +
              (params[0].data.nonTargetCount - params[1].data.nonTargetCount > 0
                ? "+"
                : "") +
              params[1].data.nonTargetCount +
              "</div>"
            : ""
        }` +
        "</div>";
      return result;
    },
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
    name: "单位(台)",
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
          if (diff !== undefined) {
            if (diff >= 0) {
              arr.push(`{a|(${diff > 0 ? "+" : ""}${diff})}`);
            } else {
              arr.push(`{b|(${diff})}`);
            }
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
      name: "上月数据",
      type: "line",
      data: [],
      symbol: "circle",
      symbolSize: 8,
      zlevel: 1,
    },
  ],
};
