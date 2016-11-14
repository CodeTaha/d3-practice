//mocha.setup({timeout:3000}); //first method of setting timeouts
describe('my first test suite', function() {
	beforeEach(function() {
		console.log('beforeEach');
	});

	afterEach(function() {
		console.log('afterEach');
	});

	before(function() {
		console.log('before');
	});

	after(function() {
		console.log('after');
	});

	it('should be first test', function() {
		console.log('test1');
		expect(1).to.equal(1);
	});

	describe('inner suite', function() {
		it('should be first inner test', function() {
			console.log('test2');
			expect(1).to.equal(1);
		});

		it('should be first second test', function() {
			console.log('test3');
			expect(1).to.equal(1);
		});

		it.skip('should be first inner SKIPPED test', function() {
			console.log('test4');
			expect(1).to.equal(1);
		});

		xit('should be second inner SKIPPED test', function() {
			console.log('test5');
			expect(1).to.equal(1);
		});

		it('should be PENDING test');
	});

	describe('Async Tests', function() {
		it('should be asynchronous', function(done) {
			setTimeout(function() {
				expect(1).to.equal(1);
				done();
			}, 10);
		});

		// setting up timeout in case of longer times
		it('should be asynchronous', function(done) {
			this.timeout(3000); // second method of setting timeouts
			setTimeout(function() {
				expect(1).to.equal(1);
				done();
			}, 2500);
		});
	});
});

