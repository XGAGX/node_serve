const cluster = require('cluster');
const cronList = {};
if (!cluster.isMaster) {
  /// ////////////////////
  // 非主线程.防止定时任务在多线程下重复运行
} else {
  /// /////////////////////
  // 主线程
  const CronJob = require('cron').CronJob;
  console.log('载入定时任务');
  /// ///////////一个定时任务//////////////
  cronList['job1'] = new CronJob({
    cronTime: '0 * * * * *', // cron时间
    onTick: () => {
      console.log('job1开始定时任务');
      console.log('job1定时任务结束');
      console.log('job1', '>>下一次启动时间>>', cronList['job1'].nextDates().format('YYYY-MM-DD HH:mm:ss'));
    },
    onComplete: () => {
      console.log('定时任务被手动停止时触发');
    },
    start: true // 是否立刻启动计时器 默认为false,默认需要手动运行 start 方法启动
  });
  /// //////////////////////////////////
  // 打印所有定时任务
  Object.keys(cronList).forEach(key => {
    console.log('任务>>', key, '>>下一次启动时间>>', cronList[key].nextDates().format('YYYY-MM-DD HH:mm:ss'));
  });
}
module.exports = cronList;
