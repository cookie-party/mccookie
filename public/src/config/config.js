//config
let host = location.href.substring(location.href.indexOf('//')+2, location.href.length-1);
let port = null;
if(host.indexOf(':')>0) {
  port = host.substring(host.indexOf(':')+1);
  host = host.substring(0,host.indexOf(':'));
}
let ssl = false;
if(location.href.indexOf('https')>=0){
  ssl = true;
}
module.exports = {
  HOST: host,
  PORT: port,
  SSL: ssl,
  APIVERSION: '1', //TODO api/versionで取得予定
};