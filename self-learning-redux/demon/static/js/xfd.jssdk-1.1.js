//;(function() {
	var jxfd = {};
	jxfd.phones = function(callback){
    jxfd.phonescallbackfun = callback;
    alert(jxfd.phonescallbackfun)
		invokeUniWebView("phones","callback=" + callback);
	}
	jxfd.phonescallback = function(data){
		try {
			jxfd.phonescallbackfun(data);
		} catch (e) {
			alert(e.message);
		}
	}

	jxfd.callrecord = function( callback){
		jxfd.callrecordcallbackfun = callback;
		invokeUniWebView("callrecord","callback=" + callback);
	}
	jxfd.callrecordcallback = function(data){
		try {
			jxfd.callrecordcallbackfun(data);
		} catch (e) {
			alert(e.message);
		}
	}
	

	jxfd.cgps = function( callback){
		jxfd.cgpscallbackfun = callback;
		invokeUniWebView("cgps","callback=" + callback);
	}
	jxfd.cgpscallback = function(data){
		try {
			jxfd.cgpscallbackfun(data);
		} catch (e) {
			alert(e.message);
		}
	}
	
	jxfd.applist = function(callback){
		jxfd.applistcallbackfun = callback;
		invokeUniWebView("applist", "callback=" + callback);
	}
	jxfd.applistcallback = function(data){
		try {
			jxfd.applistcallbackfun(data);
		} catch (e) {
			alert(e.message);
		}
	}

	jxfd.ocr = function(callback){
		jxfd.ocrcallbackfun = callback;
		invokeUniWebView("ocr", "callback=" + callback);
	}
	jxfd.ocrcallback = function(data){
		try {
			jxfd.ocrcallbackfun(data);
		} catch (e) {
			alert(e.message);
		}
	}

	jxfd.face = function(callback){
		jxfd.facecallbackfun = callback;
		invokeUniWebView("face", "callback=" + callback);
	}
	jxfd.facecallback = function(data){
		try {
			jxfd.facecallbackfun(data);
		} catch (e) {
			alert(e.message);
		}
	}

	jxfd.taskFinish = function(params){
//		jxfd.taskFinishcallbackfun = callback;
		invokeUniWebView("taskFinish", "taskType="+params.taskType);
	}
//	jxfd.taskFinishcallback = function(data){
//		try {
//			jxfd.taskFinishcallbackfun(data);
//		} catch (e) {
//			alert(e.message);
//		}
//	}
	
	jxfd.close = function(){
		invokeUniWebView("close");
	}


	/**params为url get参数格式如:num1=2&num2=3&callback=function(){}*/
	function invokeUniWebView(method, params){
		if(window.console){
			console.log("uniwebview://"+method+((params)? ("?"+params) : ''));
		}
		window.location.href = "uniwebview://"+method+((params)? ("?"+params) : '');
	}
//});

