import Base64Request from '@/utils/Base64Request';
import Request from '@/utils/request';

// 获取用户信息
function getUserInfo() {
    return Request('/portal/sysmenu.do/getSessionUser');
}

// 获取帆软报表信息
function fineUrl() {
    const url = '/portal/reportViewPage.do?event=jumpReportPage&reporturl=throughoutCapacityDetail-portal';
    return Base64Request(url,{ 'id' : 'report'});
}

export default function initEnv(callback) {
    const promises = [getUserInfo(),fineUrl()];
    Promise.all(promises)
    .then((res) => {
        console.log(res);
        callback(res);
    }).catch((e) => {
        // if(userData.success && userData.content){
        //     let customerId =  userData.content.mapExpand != null && userData.content.mapExpand.customerid !== 'null' ? userData.content.mapExpand.customerid : '';
        //     let url = data.content.reporturl+"&custid="+customerId;
        //     $('#mainiframe').attr("src",url);
        // }else {
        //     layui.msg("获取用户信息失败，请稍后重试或联系管理员！");
        // }
    })
}