kgh = {};

kgh.InitKatoGifHide = function(){
	$.get(chrome.extension.getURL("src/inject/kgh.html"), function(html){
		$("body").append(html);
	}, 'html');

	$(".page-org").delegate('.preview-image','click',function(e) {
        e.preventDefault();
        $(e.target).closest('.message').find('.icon-collapse-alt').trigger('click');
        return false;
    });
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			kgh.InitKatoGifHide();
		}
	}, 10);
});