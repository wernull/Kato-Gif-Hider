kgh = {};

kgh.InitKatoGifHide = function(){
	// load in flyout html from web_accessible_resources
	$.get(chrome.extension.getURL("src/inject/kgh.html"), function(html){
		$("body").append(html);
    	kgh.SetFlyoutEvents();
	}, 'html');

	// trigger message collapse when image is clicked
	$(".page-org").delegate('.preview-image','click',function(e) {
        e.preventDefault();
        $(e.target).closest('.message').find('.icon-collapse-alt').trigger('click');
    });

}

kgh.SetFlyoutEvents = function () {
	// hide all items of category clicked in flyout
	$(".kgh-hide").on('click',function(e) {
        e.preventDefault();

        var closeMessage = null;

        switch($(e.target).data("hide")) {
        	case "images":
        		closeMessage = $('.preview-image').closest('.message');
        		break;
        	case "video":
        		closeMessage = $('.preview-video').closest('.message');
        		break;
        	case "text":
        		closeMessage = $('.message:not(:has(.preview-image, .preview-video))');
        		break;
        	case "all":
        		closeMessage = $('.message');
        		break;
        }

        closeMessage.find('.icon-collapse-alt').trigger('click');

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