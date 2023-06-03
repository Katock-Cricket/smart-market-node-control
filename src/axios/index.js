import axios from "axios";

const nodeAxios = axios.create()

function initialInstance (instance, ip, port){
    //设置默认url
    instance.defaults.baseURL =  'http://' + ip + ':' + port + '';
}

const ip = "47.94.38.234";

initialInstance(nodeAxios, ip, 30081);

export {nodeAxios}
