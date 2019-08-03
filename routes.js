const fs = require('fs');

module.exports = (req, res) => {
    const url = req.url;
    const method = req.method;

    switch(url) {
        case '/': {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head>');
            res.write('<title>Node Basic</title>')
            res.write('</head>');
            res.write('<body>');
            res.write('<form action="/message" method="POST">')
            res.write('<input type="text" name="message">')
            res.write('<input type="submit" value="Send">')
            res.write('</form>');
            res.write('</body>');
            res.write('</html>');
            res.end();
            break;
        }
        case '/message': {
            if (method.toUpperCase() !== 'POST') {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            }
            const body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            });
            return req.on('end', () => {
                const data = Buffer.concat(body).toString();
                fs.writeFile('text.txt', data, (err) => {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();
                })
            })
        }
    }
}
