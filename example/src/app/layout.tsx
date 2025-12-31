import React from "react";
import './global.css'

export default async function RootLayout({
                                             header,
                                             children,
                                         }: {
    header?: React.ReactNode;
    children: React.ReactNode;
}) {
    return <html>
    <head>
        <base href="/"/>
        <meta charSet="utf-8"/>
        <meta name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
        <meta name="renderer" content="webkit"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="robots" content="index,follow"/>
        <link rel="icon" type="image/png" href="/icons/favicon-96x96.png" sizes="96x96"/>
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <title>EXAMPLE</title>
    </head>
    <body>
        {children}
    </body>
    </html>
}
