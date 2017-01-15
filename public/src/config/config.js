//config
let host = location.href.substring(location.href.indexOf('//')+2, location.href.length-1);
let port = '80';
if(host.indexOf(':')>0) {
  port = host.substring(host.indexOf(':')+1);
  host = host.substring(0,host.indexOf(':'));
}
module.exports = {
  HOST: host,
  PORT: port,
  APIVERSION: '1', //TODO api/versionで取得予定
};