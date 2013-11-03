kgh = {};

kgh.InitKatoGifHide = function(){
	$.get(chrome.extension.getURL("src/inject/kgh.html"), function(html){
		$("body").append(html);
	}, 'html');
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			kgh.InitKatoGifHide();
		}
	}, 10);
});