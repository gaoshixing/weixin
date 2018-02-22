import { httpCommon as http } from "./request";

// GET /a/ws/sys/sysNotification/listUserNotify
export const NEWS = {
    message(params){
        return http.get('/sysNotification/listUserNotify', {
            params
        })
    },

    // 标记已读() POST /a/ws/sys/sysNotification/markRead
    markRead(params){
        return http.post('/sysNotification/markRead', 
            params
        )
    },

    //  通知详情   GET /a/ws/sys/sysNotification/findNotify
    noticeDetail(params) {
        return http.get('/sysNotification/findNotify', {
            params
        })
    }
}