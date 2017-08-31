// export let host = "https://api.yizo.zhiyuan95.cn";
export let host = "https://127.0.0.1:3000";


export let apis = {
  
    "collegelist": ["GET", '/colleges'],
    "signIn": ["POST", '/account/signIn'],
    "updateUserInfo": ["PUT", '/account/:id'],
    "changeCollege":["PUT",'/users/college/:id'],
    "changePwd": ['PUT', '/account/pwd/:id'],
    "changeTel": ['PUT', '/account/tel'],
    "sendCode": ['GET', '/smsCode/:tel/:type'],
    "signUp": ['POST', '/users/signUp'],
    "resetPwd": ['PUT', '/account/pwd/tel/:tel'],



    "runOrderlist": ["GET", "/runOrder"],
    "FindRunOrder": ['POST', '/runOrder/find'],
    "giveRunOrder": ['POST', '/runOrder/give'],
    "commentList": ['GET', '/runOrders/comment'],
    "updateOrder": ['PUT', '/runOrders/:id'],
    "addComment": ['post', '/runOrders/comment'],
};