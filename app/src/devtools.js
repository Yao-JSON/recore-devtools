/* eslint no-undef:0 */
const { runtime } = chrome;

console.log(runtime);
runtime.sendMessage('recore-panel-load');
