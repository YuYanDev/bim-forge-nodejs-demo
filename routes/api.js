const express = require('express');
let router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ list: [], count: 0 })
  .write()
// router.get('/callback/oauth', async (req, res, next) => {
    
// });
function gettime(){
    var date = new Date();
    var time = date.getFullYear() + seperator + nowMonth + seperator + strDate;
    var nowMonth = date.getMonth() + 1;

    // 获取当前是几号
    var strDate = date.getDate();

    // 添加分隔符“-”
    var seperator = "-";

    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
    }

    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
    }
    return date.getFullYear() + seperator + nowMonth + seperator + strDate;
}
router.post('/submit/Repairmodule',function(req,res,next){
    var time = gettime()
    var st = req.body
    if(typeof st['dbid[]']== 'string'){
        db.get('list')
            .push({ dbid: st['dbid[]'], model: st.model,type:st.type,time:time})
            .write()
    }else{
        st['dbid[]'].map((item)=>{
        db.get('list')
            .push({ dbid: item, model: st.model,type:st.type,time:time})
            .write()
    })
    }

    var listsss = db.get('list')
    .sortBy('dbid')
    .take(10)
    .value()
    res.json({type:'success',body:listsss})
})

module.exports = router;