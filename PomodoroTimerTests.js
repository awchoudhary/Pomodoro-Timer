describe("getCountdownString Tests", function(){
	it("should return 01:05", function(){
		var timeString = getCountdownString(65);
		expect(timeString).toEqual("01:05");
	});
	it("should return 00:00", function(){
		var timeString = getCountdownString(0);
		expect(timeString).toEqual("00:00");
	});
	it("should return 10:05", function(){
		var timeString = getCountdownString(605);
		expect(timeString).toEqual("10:05");
	});
	it("should return 05:10", function(){
		var timeString = getCountdownString(310);
		expect(timeString).toEqual("05:10");
	});
});

describe("getStartButtonLabel Tests", function(){
	it("Should return label for Break with proper duration", function(){
		var label = getStartButtonLabel(4, 120);
		expect(label).toEqual("Start Break <br> (2 Minutes)");
	});
	it("Should return label for Round with proper duration", function(){
		var label = getStartButtonLabel(5, 600);
		expect(label).toEqual("Start Round <br> (10 Minutes)");
	});
});