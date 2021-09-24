export default ({ markup, css }) => {
  return `<!doctype html>
    <html lang="pl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <title>Green Deal</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <style>
            a{
              text-decoration: none
            }
        </style>
      </head>
      <body style="margin:0; background: linear-gradient(184.02deg, rgba(88, 159, 113, 0.75) 12.45%, rgba(208, 233, 168, 0) 131.93%)">
        <div id="root">${markup}</div>
        <style id="jss-server-side">${css}</style>
        <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
        <script type="text/javascript" src="/dist/bundle.js"></script>
      </body>
    </html>`
}
