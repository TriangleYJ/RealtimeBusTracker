const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const request = require('request');

const port_num = process.env.PORT || 80;
let server_timer = 0;

const url_station = 'http://bis.mokpo.go.kr/mp/bis/searchBusStopRoute.do';

app.set('view engine', 'pug');
app.set('views', 'routes');


function getOpt(url, method, form){
    return {url, method, form};
}

//server time counter
setInterval(() => {
    server_timer++;
}, 1000);

app.get('/', (req, res) => {
    res.render('index');
});
server.listen(port_num, () => {
    console.log('server running on ' + port_num +' port');
});

io.on('connection', socket => {

    socket.on('connect_', data => {
        console.log('Client connected : ' + socket.id);
    });

    socket.on('test_emit', data =>{
        socket.my_vehicles_sev = [];
        if(data != null) {
            this.interval = setInterval(() => {
                let data_obj = JSON.parse(data);

                for(let i in data_obj){
                    let opt = getOpt(url_station, 'POST', {busStopId: data_obj[i]["stopId"]});
                    //TODO:minimize communication
                    request.post(opt, (err, res, body) => {
                        let vehicles = JSON.parse(body)['busStopRouteList'];
                        let my_vehicles_one = vehicles.filter(e => e["route_id"] === data_obj[i]["routeId"]);

                        let {veh_id, provide_code, provide_type, last_stop_name, rstop, route_name} = my_vehicles_one[0];
                        let my_vehicle = {veh_id, provide_code, provide_type, last_stop_name, rstop, route_name};
                        let my_vehicle_string = JSON.stringify(my_vehicle);

                        //console.log(my_vehicle_string);

                        if(my_vehicle_string !== socket.my_vehicles_sev[i] || socket.my_vehicles_sev[i] === undefined){
                            socket.my_vehicles_sev[i] = my_vehicle_string;
                            socket.emit('test_emit_res', JSON.stringify([i, my_vehicle]));
                        }
                    });
                }
            }, 1000);
        }
    });

    socket.on('forcedisconnect', () => {
        socket.disconnect();
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected : ' + socket.id);
        clearInterval(this.interval);
    });
});