import config from '../../config';
const isDev =process.env.NODE_ENV === 'development';

export function renderFullHTML({componentHTML, initialState, title, csrfToken,}) {
    const staticUrl = `${isDev ? `http://localhost:${config.WEBPACK_PORT}` : ''}/static/build`;

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="_csrf" content="${csrfToken}">
            <link rel="shortcut icon" href="/static/favicon/favicon.ico"/>
            <title>${title}</title>
            <link rel="stylesheet" href="${staticUrl}/main.css">
            <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400|Roboto:300,400&amp;subset=cyrillic-ext,latin-ext" rel="stylesheet">
            <script src="/static/js/web-animations-next.min.js"></script>
        </head>
        <body>
            <div id="root">${componentHTML}</div>            
            <script type="application/javascript" id="bootstrap">
                window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            </script>
            <script type="application/javascript" src="${staticUrl}/main.js"></script>
        </body>
        </html>
    `;
}

export function fetchComponentsData(dispatch, components, params, query) {
    const promises = components.map(current => {
        const component = current.WrappedComponent
            ? current.WrappedComponent
            : current;

        return component.fetchData
            ? component.fetchData(dispatch, params, query)
            : null;
    });

    return Promise.all(promises);
}
