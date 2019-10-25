import request from "@/utlis/request";

// 获取权限验证编码
export const loginJurisdiction = async (data) => await request({
	method: 'post',
	url   : '/api/v1.0/loginJurisdiction',
	data
});