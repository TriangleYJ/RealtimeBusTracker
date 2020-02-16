$(() => {
    let socket = io();
    let wishList = "{\"random20\":{\"routeId\":\"324000015\",\"stopId\":\"101503003\",\"stopId_dst\":\"100101051\",\"afterId\":null},\"random13\":{\"routeId\":\"324000011\",\"stopId\":\"101503004\",\"stopId_dst\":\"130001112\",\"afterId\":null},\"random60\":{\"routeId\":\"324000021\",\"stopId\":\"101502075\",\"stopId_dst\":\"103001033\",\"afterId\":null},\"random1\":{\"routeId\":\"324000001\",\"stopId\":\"111900032\",\"stopId_dst\":\"103001039\",\"afterId\":\"random13\"}}";

    socket.emit("connect_", {});

    socket.emit('test_emit', wishList);

    socket.on('test_emit_res', data_string => {
        let raw = JSON.parse(data_string);
        console.log(raw[0], JSON.stringify(raw[1]));

        //$('#log').text(data);
    });

});