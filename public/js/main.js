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
					globalExchangesList: 'globalExchanges.list',
            		globalExchangesPrice: 'globalExchanges.price',
					connectionsCount: 'connections.count',
				}
			}
		},
		calc: {
			units: {
				USD: "-",
				BTC: "1",
				IRT: "-",
				SAT: "-",
			},
			selected: "BTC"
		},
		exchanges: [],
		globalPrice: 0,
		localPrice: 0,
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
			this.calcUpdate();
		}.bind(this));

		socket.on( this.config.socket.room.globalExchangesPrice , function(exchanges) {
			this.updateGlobalPrices(exchanges);
			this.calcUpdate();
		}.bind(this));

		socket.on( this.config.socket.room.connectionsCount , function(connectionsCount) {
			this.connectionsCount = connectionsCount;
		}.bind(this));

	},

	methods: {
		updatePrices: function(exchanges) {

			// Update localPrice
			// TODO: Magic number usage
			let exchange = exchanges[0];
			if (exchange.id == 1) {
				this.localPrice = Math.round( (exchange.ask+exchange.bid)/2 );
			}

			// Update prices
			this.exchanges = this.exchanges.map(item => {
				let item2 = exchanges.find(i2 => i2.id === item.id);
				return item2 ? { ...item, ...item2 } : item;
			});
		},

		updateGlobalPrices: function(exchanges) {
			this.globalPrice = exchanges[0].price
		},

		updateChart: function() {
			let exchanges = this.exchanges;
			let data = [];
			this.chart.colors.reset();
			exchanges.forEach(exchange => {
				data.push({
					"name": exchange.name,
					"bid": exchange.bid,
					"ask": exchange.ask,
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
			columnSeries.dataFields.valueX = "ask";
			columnSeries.dataFields.openValueX = "bid";
			columnSeries.columns.template.tooltipText = "[bold]{categoryY}[/]\nSell at {openValueX} IRT\nBuy at {valueX} IRT";
			

			let columnTemplate = columnSeries.columns.template;
			columnTemplate.strokeOpacity = 0;
			columnTemplate.propertyFields.fill = "color";
			columnTemplate.height = am4core.percent(100);

			this.chart = chart;
		},

		calcInput: function(unitName) {
			this.calc.selected = unitName;
			this.calcUpdate();
		},

		calcUpdate: function() {

			// Make a local copy
			let data = {...this.calc.units};
			Object.entries(data).forEach(([key, val]) => {
				data[key] = Number(val.replace(/,/g, ''));
			});

			// Calculate
			switch(this.calc.selected) {
				case 'USD':
					data.BTC = data.USD / this.globalPrice;
					break;
				case 'IRT':
					data.BTC = data.IRT / this.localPrice;
					break;
				case 'SAT':
					data.BTC = data.SAT / 100_000_000;
					break;
			}
			
			data.USD = Number( data.BTC * this.globalPrice ).toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
			data.IRT = Number( Math.round( data.BTC * this.localPrice ) ).toLocaleString();
			data.SAT = Number( Math.round( data.BTC * 100_000_000 ) ).toLocaleString();
			data.BTC = Number( data.BTC ).toFixed(8).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
			
			// Overwrite original values
			Object.entries(data).forEach(([key, val]) => {

				// Input field format
				if (this.calc.selected == key) {
					// Remove commas
					val = this.calc.units[key].replace(/,/g, '');
					// Add commas
					val = val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
				}
				
				this.calc.units[key] = val;
			});

		},

	},

	computed: {
		calcChartHeight: function() {
			return this.exchanges.length*this.config.chartRowHeight + this.config.chartLabelHeight;
		},
	},

	filters: {
		priceIRT: function(value) {
			if (!value) return '-';
			return Number(value).toLocaleString() + ' IRT';
		},
		priceUSD: function(value) {
			if (!value) return '-';
			return '$' + Number(Math.round(value)).toLocaleString();
		},
		priceRoundUSD: function(value) {
			if (!value) return '';
			return '$' + Number(Math.round(value/1000)).toLocaleString() + 'K';
		}
	}
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
