describe("Calculator", function(){
	var calculator;

	beforeEach(function(){
		calculator = new Calculator();
	});

	describe("Add", function (){
		it("Should return the sum of both operands", function(){
		});
	});
	describe("Subtract", function (){
		it("Should return the difference of both operands", function(){
			expect(calculator.subtract(4,1)).to.be(3);
		});
	});
});