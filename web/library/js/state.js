function State(initialState) {
	this.initialState = Object.freeze(Object.assign({}, initialState))
	this.values = this.initialState
}

State.prototype.setState = function (newState) {
	this.values = Object.freeze(Object.assign({}, this.values, newState))
}
State.prototype.clearState = function () {
	this.values = {}
}
State.prototype.deleteFromState = function (key) {
	const entries = Object.entries(this.values)
	const newEntries = entries.filter(function (entry) {
		return entry[0] !== key
	})
	this.values = Object.fromEntries(newEntries)
}
