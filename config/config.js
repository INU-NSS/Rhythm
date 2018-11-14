const config = {
    app:{
        port: 443
    },
    db: {
        host: '192.168.0.7',
        port: 27017,
        name: 'test',
    },
    mqtt: {
        host: '192.168.0.7'
    },
    socket: {
        port: 1553,
        host: 'nms.iptime.org'
    }
};

module.exports = config;