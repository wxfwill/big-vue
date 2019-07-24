import Vue                 from 'vue';
import Vuex                from 'vuex';
import homePage            from './modules/home-page';
import judicial            from './modules/judicial/index';
import penal               from './modules/judicial/penal';
import civil               from './modules/judicial/civil';
import administrative      from './modules/judicial/administrative';
import inspectionGuarantee from './modules/inspection-guarantee';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		homePage,
		judicial,
		penal,
		inspectionGuarantee,
		civil,
		administrative,
	}
})
