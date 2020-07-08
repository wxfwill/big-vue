import request from "@/utlis/request";

// 获取权限验证编码
export const loginJurisdiction = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/loginJurisdiction',
	params: data
});