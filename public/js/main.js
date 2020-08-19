// amCharts
am4core.useTheme(am4themes_animated);

// Socket + VueJS
var socket = io();

var app = new Vue({
	el: '#app',

	data: {
		config: {
			// Chart settings
			chartRowHeight: 43, // px
			chartLabelHeight: 68, // px

			// Shared socket messages pattern
			socket: {
				room: {
					exchangesList: 'exchanges.list',
					exchangesPrice: 'exchanges.price',
					connectionsCount: 'connections.count',
				}
			}
		},
		exchanges: [],
		connectionsCount: 0,
		loaded: false,
	},

	mounted: function() {

		this.createChart();

		socket.on( this.config.socket.room.exchangesList , function(exchanges) {
			this.exchanges = exchanges;
			this.loaded = true
		}.bind(this));

		socket.on( this.config.socket.room.exchangesPrice , function(exchanges) {
			this.updatePrices(exchanges);
			this.updateChart();
		}.bind(this));

		socket.on( this.config.socket.room.connectionsCount , function(connectionsCount) {
			this.connectionsCount = connectionsCount;
		}.bind(this));

	},

	methods: {
		updatePrices: function(exchanges) {
			this.exchanges = this.exchanges.map(item => {
				let item2 = exchanges.find(i2 => i2.id === item.id);
				return item2 ? { ...item, ...item2 } : item;
			});
		},

		updateChart: function() {
			let exchanges = this.exchanges;
			let data = [];
			this.chart.colors.reset();
			exchanges.forEach(exchange => {
				data.push({
					"name": exchange.name,
					"sellPrice": exchange.sell,
					"buyPrice": exchange.buy,
					"color": this.chart.colors.next()
				});
			});

			this.chart.data = data;
		},

		createChart: function() {
			let labelColor = '#808080';

			let chart = am4core.create("chartdiv", am4charts.XYChart);

			let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = "name";
			categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.labels.template.fill = am4core.color(labelColor);
			categoryAxis.renderer.grid.template.stroke = am4core.color(labelColor);

			let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
			valueAxis.renderer.labels.template.fill = am4core.color(labelColor);
			valueAxis.renderer.grid.template.stroke = am4core.color(labelColor);

			let columnSeries = chart.series.push(new am4charts.ColumnSeries());
			columnSeries.dataFields.categoryY = "name";
			columnSeries.dataFields.valueX = "buyPrice";
			columnSeries.dataFields.openValueX = "sellPrice";
			columnSeries.columns.template.tooltipText = "[bold]{categoryY}[/]\nSell at {openValueX} IRT\nBuy at {valueX} IRT";
			

			let columnTemplate = columnSeries.columns.template;
			columnTemplate.strokeOpacity = 0;
			columnTemplate.propertyFields.fill = "color";
			columnTemplate.height = am4core.percent(100);

			this.chart = chart;
		}
	},

	computed: {
		calcChartHeight: function() {
			return this.exchanges.length*this.config.chartRowHeight + this.config.chartLabelHeight;
		},
	},
});

// Template
(function ($) {
	"use strict";
	$('.column100').on('mouseover',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).addClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).addClass('hov-column-head-'+ verTable);
	});

	$('.column100').on('mouseout',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).removeClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).removeClass('hov-column-head-'+ verTable);
	});
    

})(jQuery);
