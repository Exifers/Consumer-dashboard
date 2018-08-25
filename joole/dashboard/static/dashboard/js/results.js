window.onload = function () {
  var ttcWatts = "<span style='\"'color: #6f75a8;'\"'>{label}: {y} Watts</span>";
  var ttcEuros = "<span style='\"'color: #00bfd1;'\"'>{label}: {y}€</span>";
  var conso_euro = from_django[0];
  var conso_watt = from_django[1];
  var chart = new CanvasJS.Chart("conso_graph", {
    animationEnabled: true,
    theme: "light2",
    zoomEnabled: true,
    animationDuration: 1080,
    axisX:{
      labelFontSize: 15,
      interval: 1,
      labelAngle: -50
    },
    axisY:{
        title: "Watts",
        titleFontColor: "#6f75a8",
        labelFontColor: "#6f75a8",
        gridThickness: 1,
        titleFontSize: 24,
        labelFontSize: 15,
        gridThickness: 0,
        tickThickness: 0
    },
    axisY2:{
        title: "Euros",
        titleFontColor: "#00bfd1",
        labelFontColor: "#00bfd1",
        gridThickness: 1,
        titleFontSize: 24,
        labelFontSize: 15,
        gridThickness: 0,
        tickThickness: 0,
    },
    data: [{
      type: "line",
      color: "#6f75a8",
      dataPoints: [
        { label: "Janvier",   y: conso_watt[0] , toolTipContent: ttcWatts },
        { label: "Février",   y: conso_watt[1] , toolTipContent: ttcWatts },
        { label: "Mars",      y: conso_watt[2] , toolTipContent: ttcWatts },
        { label: "Avril",     y: conso_watt[3] , toolTipContent: ttcWatts },
        { label: "Mai",       y: conso_watt[4] , toolTipContent: ttcWatts },
        { label: "Juin",      y: conso_watt[5] , toolTipContent: ttcWatts },
        { label: "Juillet",   y: conso_watt[6] , toolTipContent: ttcWatts },
        { label: "Août",      y: conso_watt[7] , toolTipContent: ttcWatts },
        { label: "Septembre", y: conso_watt[8] , toolTipContent: ttcWatts },
        { label: "Octobre",   y: conso_watt[9] , toolTipContent: ttcWatts },
        { label: "Novembre",  y: conso_watt[10], toolTipContent: ttcWatts },
        { label: "Décembre",  y: conso_watt[11], toolTipContent: ttcWatts }
      ]
    },
    {
      type: "line",
      color: "#00bfd1",
      axisYType: "secondary",
      dataPoints: [
        { label: "Janvier",   y: conso_euro[0] , toolTipContent: ttcEuros },
        { label: "Février",   y: conso_euro[1] , toolTipContent: ttcEuros },
        { label: "Mars",      y: conso_euro[2] , toolTipContent: ttcEuros },
        { label: "Avril",     y: conso_euro[3] , toolTipContent: ttcEuros },
        { label: "Mai",       y: conso_euro[4] , toolTipContent: ttcEuros },
        { label: "Juin",      y: conso_euro[5] , toolTipContent: ttcEuros },
        { label: "Juillet",   y: conso_euro[6] , toolTipContent: ttcEuros },
        { label: "Août",      y: conso_euro[7] , toolTipContent: ttcEuros },
        { label: "Septembre", y: conso_euro[8] , toolTipContent: ttcEuros },
        { label: "Octobre",   y: conso_euro[9] , toolTipContent: ttcEuros },
        { label: "Novembre",  y: conso_euro[10], toolTipContent: ttcEuros },
        { label: "Décembre",  y: conso_euro[11], toolTipContent: ttcEuros }
      ]
    }]
  });
  chart.render();
}
