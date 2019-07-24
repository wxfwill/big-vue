export const triggerMixin = {
	beforeCreate() {
		this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
		this.oldTriggerState = {};
	},
	destroyed() {
		this.initPenalState && this.initPenalState();
	},
};