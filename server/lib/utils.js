import config from '../../config';

const isDev = process.env.NODE_ENV === 'development';

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
            <div id="mainLoader" style="fill:#fff;height:64px;width:64px;" class="loader" data-reactid="2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <circle transform="translate(8 0)" cx="0" cy="16" r="1.03904"> 
                        <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0" keyTimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline"></animate>
                    </circle>
                    <circle transform="translate(16 0)" cx="0" cy="16" r="3.82357"> 
                        <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.3" keyTimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline"></animate>
                    </circle>
                    <circle transform="translate(24 0)" cx="0" cy="16" r="0"> 
                        <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.6" keyTimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline"></animate>
                    </circle>
                </svg>
            </div>            
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
