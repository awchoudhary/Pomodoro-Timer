describe("getCountdownString Tests", function(){
	it("should return 01:05", function(){
		var timeString = getCountdownString(65);
		expect(timeString).toEqual("01:05");
	});
});