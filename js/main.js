/**
 * main.js
 * Uses WebScraper to automate web scraping from DOM elements
 * ciatph, 20180518
 */

var ws;
var btnDownload;
var btnReset;
var btnScrape;
var btnStop;
var inFrom;
var inTo;
var labelLoading;
var labelBase;

var urlCookie = "http://www.iucnredlist.org/search/link/5afd35f0-6ab4051c";


/**
 * Initialize DOM elements
 * Bind WebScraper methods to DOM elements
 */
var init = function(){
	labelBase = $("#labelBase");
	labelBase.html("Base url: " + ws.settings.baseUrl);

	// initialize the reset button
	btnReset = $("#btnReset").click(function(){
		console.log('clicked reset');
		setLabelLoading("");
		inFrom.val(1);
		inTo.val(MAX_PAGE_COUNT);
		ws.reset();	
		ws.setBaseUrlCookie(urlCookie);

		// re-activate main buttons
		btnScrape.prop('disabled', false);
		btnReset.prop('disabled', true);
		btnDownload.prop('disabled', true);		
	});

	// initialize the download file button
	btnDownload = $("#btnDownload").click(function(){
		console.log('clicked download');
		ws.downloadFile();	
	});		

	// initialize web scrape button
	btnScrape = $("#btnScrape").click(function(){
		console.log('clicked web scrape');

		// set the current FROM and TO (min, max) page range
		if(ws.setMinPage(inFrom.val()) && ws.setMaxPage(inTo.val())){
			if(ws.canLoadSpecies()){
				ws.loadSpecies(activate);	
			}
			else{
				alert("Cannot load, please check your input.");
			}
		}	
	});	

	// initialize the stop button
	btnStop = $("#btnStop").click(function(){
		console.log('clicked stop');
		ws.stop();	
		btnStop.prop('disabled', true);
	});		

	// initialize the FROM/min page input box
	inFrom = $("#pfrom").click(function(){
		inFrom.val("");
	});

	// initialize the TO/max page input box
	inTo = $("#pto").click(function(){
		inTo.val("");
	});	

	// initialize the log loading label output
	labelLoading = $("#labelLoading");
	setLabelLoading("");

	// disable buttons
	btnStop.prop('disabled', true);
	btnReset.prop('disabled', true);
	btnDownload.prop('disabled', true);
};



/**
 * Set the scraping/data loading log message
 */
var setLabelLoading = function(page){
	var msg = (page == "") ? "<br>" : page;

	if(parseInt(page))
		msg = "Loading page " + page + "/" + ws.settings.maxPage + "...";
	
	labelLoading.html(msg);
};



/**
 * Enable/disable the buttons and input boxes
 */
var activate = function(param){
	console.log("DISABLED: " + param[0]);

	if(param.length == 2){
		setLabelLoading(param[1]);
	}
	else{
		// Activate buttons only
		if(!param[0]){
			var msg = (ws.countLoaded == 0) ? "An error occured while fetching data." : "FINISHED LOADING! " + ws.countLoaded + " PAGES";
			setLabelLoading(msg);
		}

		try{
			btnDownload.prop('disabled', param[0]);
			if(param[0])
				btnScrape.prop('disabled', param[0]);

			btnStop.prop('disabled', !param[0]);
			inFrom.prop('disabled', param[0]);
			inTo.prop('disabled', param[0]);
			btnReset.prop('disabled', param[0]);
		}
		catch(e){
			console.log("initializing elements...");
			init();
			activate(param);
		}
	}
};


/**
 * Main program start
 */
$(document).ready(function(){
	ws = new WebScraper();
	ws.setBaseUrlCookie(urlCookie);
	init();
});