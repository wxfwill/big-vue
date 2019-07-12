import Vue       from 'vue';
import Vuex      from 'vuex';
import homePage  from './modules/home-page';
import judicial  from './modules/judicial';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		homePage,
		judicial,
	}
})
