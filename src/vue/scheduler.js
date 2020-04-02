const has = {};
let queue = [];

export function nextTick(cb) {
  if (typeof Promise !== "undefined") {
    Promise.resolve().then(cb);
  } else {
    setTimeout(cb);
  }
}

// 清空
function resetSchedulerState() {
  queue = [];
}
// 执行任务
function flushSchedulerQueue() {
  queue.sort((a, b) => a.id - b.id);
  for (let index = 0; index < queue.length; index++) {
    let watcher = queue[index];
    let id = watcher.id;
    has[id] = null;
    watcher.run();
  }
  resetSchedulerState();
}
// 任务队列
export function queueWatcher(watcher) {
  const id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);
    nextTick(flushSchedulerQueue);
  }
}
