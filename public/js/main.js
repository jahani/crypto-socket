var socket = io();

var app = new Vue({
	el: '#app',

	data: {
		exchanges: {}
	},

	mounted: function() {

		socket.on('exchanges.list', function(exchanges) {
			this.exchanges = exchanges;
		}.bind(this));

		socket.on('exchanges.price', function(exchanges) {		
			this.updatePrices(exchanges);
		}.bind(this));
	},

	methods: {
		updatePrices: function(exchanges) {
			exchanges.forEach(exchange => {
				console.log(exchange);
				var initialObject = this.exchanges[exchange.id];
				var ChangesObject = exchange;
				var finalObject = {...initialObject, ...ChangesObject };
				this.exchanges[exchange.id] = finalObject;
				// this['exchanges'][exchange.id]['buy'] = exchange.buy;
				// this.exchanges[exchange.id]['sell'] = exchange.sell;
			});
		}
	}
});


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