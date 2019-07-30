import request from "../../../utlis/request";

export const getProcuratorialOfficeData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/procuratorialOffice/getProcuratorialOfficeData',
	params: data
});