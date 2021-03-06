const config = {
    app:{
        port: 80
    },
    db: {
        host: '192.168.0.7',
        port: 27017,
        name: 'test',
    },
    mqtt: {
        host: '192.168.0.7',
        port: '1883'
    },
    socket: {
        port: 1553,
        host: 'nms.iptime.org'
    },
    key: {
        solarkey: '1%2B3oRBiymPLtzGGcI115AWcHDJF8wPyYq%2FlpP5pM0z80nBhxblstcxW4LBjomJqdDlycAd5QutcOTiKGfIE0aQ%3D%3D',
        cloudkey: '%2BvfGC7aR%2BjJVlb5gBCfDySyyPzMg2yh9kGFMJZItbGJqwPe2H%2B%2BZCiItqIg8ENiOxA%2FYJPrdtfM52JrSXJzVKg%3D%3D'
    },
    user: {
        id: 'admin',
        pw: '1234'
    }

};

module.exports = config;