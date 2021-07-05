const { createServer } = require("http");
const app = require("./dist/App.js");

createServer((request, result) => {
    const { html } = app.render({ url: request.url });

    result.write(`
        <!DOCTYPE html>
        <html lang="en" class="w-screen h-screen">
            <head>
                <meta charset='utf-8'>
                <meta name='viewport' content='width=device-width,initial-scale=1'>

                <title>Svelte app</title>

                <link rel='icon' type='image/png' href='/favicon.png'>
                <link rel='stylesheet' href='/global.css'>
                <link rel='stylesheet' href='/build/bundle.css'>
                
                <script defer src='/build/bundle.js'></script>
            </head>

            <body class="bg-gray-700 text-gray-100 w-screen h-screen">
            ${html}
            </body>
        </html>
    `);

    result.end();
}).listen(5000);