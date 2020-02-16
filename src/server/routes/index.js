$(() => {
    let socket = io();
    socket.emit("connect_", {});

    socket.emit('test_emit', {});

    socket.on('test_emit_res', data => {
        $('#log').text(data);
    });

});