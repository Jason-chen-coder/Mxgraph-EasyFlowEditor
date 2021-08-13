module.exports = {
  options: {
    // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
    // 或者，在 require('os').cpus() 是 undefined 时回退至 1
    // workers: require('os').cpus() - 1,

    // 一个 worker 进程中并行执行工作的数量
    // 默认为 20
    workerParallelJobs: 20,

    // 额外的 Node.js 参数
    workerNodeArgs: ['--max-old-space-size=4096'],

    // Allow to respawn a dead worker pool
    // respawning slows down the entire compilation
    // and should be set to false for development
    poolRespawn: false,

    // 闲置时定时删除 worker 进程
    // 默认为 500ms
    // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
    poolTimeout: 500,

    // 池(pool)分配给 worker 的工作数量
    // 默认为 200
    // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
    poolParallelJobs: 200,

  },
};
