QUnit.module('module 1');

QUnit.test('my first test', function(assert) {
	assert.ok(true);
});

QUnit.module('module 2', {
	beforeEach: function() {
		console.log("setup");
	},
	afterEach: function() {
		console.log("teardown");
	}
});

QUnit.test('my second test', function(assert) {
	assert.ok(true);
});

QUnit.test('my third test', function(assert) {
	assert.ok(true);
});

QUnit.module('module 3: fails');

QUnit.test('my first failing test', function(assert) {
	assert.ok(false);
});