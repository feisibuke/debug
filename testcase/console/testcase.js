require([ '../../debug/console' ], function(console) {
	/*
	 * 标准console测试
	 */
	var timeStart = 0;
	[ function() {
		console.log(123123123123);
	}, function() {
		console.debug(123123123123);
	}, function() {
		console.warn(123123123123);
	}, function() {
		console.error(123123123123);
	},
	//
	function() {
		console.log('这是一个标准的console，点击我打开，可以查看log完整记录');
	}, function() {
		console.debug('这是一个标准的console，点击我打开，可以查看log完整记录');
	}, function() {
		console.warn('这是一个标准的console，点击我打开，可以查看log完整记录');
	}, function() {
		console.error('这是一个标准的console，点击我打开，可以查看log完整记录');
	},
	//
	function() {
		console.log({
			text : '这是一个标准的console，点击我打开，可以查看log完整记录'
		});
	}, function() {
		console.debug({
			text : '这是一个标准的console，点击我打开，可以查看log完整记录'
		});
	}, function() {
		console.warn({
			text : '这是一个标准的console，点击我打开，可以查看log完整记录'
		});
	}, function() {
		console.error({
			text : '这是一个标准的console，点击我打开，可以查看log完整记录'
		});
	},
	/*
	 * 长度测试
	 */
	function() {
		console.log({
		    "value" : {
		        "tabtype" : 1,
		        "ver" : 0,
		        "tripType" : 1,
		        "ticketIssueCty" : "BJS",
		        "flag" : 0,
		        "pageIdx" : 1,
		        "passengerType" : 1,
		        "items" : [ {
		            "dCtyCode" : "BJS",
		            "dCtyId" : 1,
		            "dcityName" : "北京",
		            "dkey" : 3,
		            "aCtyCode" : "SHA",
		            "aCtyId" : 2,
		            "acityName" : "上海",
		            "akey" : 2,
		            "date" : "2014/05/21"
		        } ],
		        "_items" : [ {
		            "dCtyCode" : "BJS",
		            "dCtyId" : 1,
		            "dcityName" : "北京",
		            "dkey" : 3,
		            "aCtyCode" : "SHA",
		            "aCtyId" : 2,
		            "acityName" : "上海",
		            "akey" : 2,
		            "date" : "2014/05/21"
		        } ],
		        "class" : 0,
		        "depart-sorttype" : "time",
		        "depart-orderby" : "asc",
		        "arrive-sorttype" : "time",
		        "arrive-orderby" : "asc",
		        "calendarendtime" : "2014/10/31 00:00:00",
		        "submittime" : 1400589835978,
		        "__tripType" : 1
		    },
		    "oldvalue" : {},
		    "timeout" : "2014/05/22 15:03:54",
		    "tag" : null,
		    "savedate" : "2014/05/21 15:03:54"
		})
	},

	/**
	 * 
	 */
	function() {
		console.log('touchstart不动，300ms后，出现透明状，可以所以拖动改变位置')
	}

	].forEach(function(o) {
		timeStart += 300;
		setTimeout(function() {
			o()
		}, timeStart);
	})
})