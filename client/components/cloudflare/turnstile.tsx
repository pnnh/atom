'use client'

import React, {useEffect} from "react";
import $ from "jquery";

function turnstileErrorCallback(error: string) {
    console.error('Challenge Error', error);
    // const overlay = $('#cfTurnstileOverlay')
    // if (!overlay) {
    //     return;
    // }
    // overlay.show()
}

function turnstileSuccessCallback(token: string) {
    console.debug('Challenge Success', token);
    const overlay = $('#cfTurnstileOverlay')
    if (!overlay) {
        return;
    }
    overlay.hide()
    if (window.turnstileSuccessCallback) {
        window.turnstileSuccessCallback(token)
    }
}

export function turnstileScript(publicTurnstileKey: string) {
    let turnstileContent = document.getElementById('turnstile-content')
    if (turnstileContent) {
        console.error('Turnstile content not found or already exists')
        return
    }
    if (!window.turnstile) {
        console.error('Turnstile not found')
        return;
    }
    window.turnstile.ready(function () {
        turnstileContent = document.createElement('div')
        turnstileContent.id = 'turnstile-content'
        const turnstileBody = document.getElementById('turnstile-body')
        if (!turnstileBody) {
            console.error('Turnstile body not found')
            return;
        }
        turnstileBody.appendChild(turnstileContent)
        // const clientConfig = useClientConfig()
        const sitekey = publicTurnstileKey//clientConfig.PUBLIC_TURNSTILE
        if (!sitekey) {
            console.error('Turnstile sitekey not found')
            return
        }

        window.turnstile.render("#turnstile-content", {
            sitekey: sitekey,
            language: 'zh-cn',
            callback: turnstileSuccessCallback,
            "error-callback": turnstileErrorCallback,
            "expired-callback": turnstileErrorCallback,
            "unsupported-callback": turnstileErrorCallback,
            "timeout-callback": turnstileErrorCallback
        });
    });
}

export async function getTurnstileToken(): Promise<string | undefined> {
    if (!window.turnstile) {
        return;
    }
    const token = window.turnstile.getResponse()
    if (token && !window.turnstile.isExpired()) {
        return token
    }
    const overlay = $('#cfTurnstileOverlay')
    if (!overlay) {
        return;
    }
    overlay.show()
    return new Promise<string | undefined>((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Promise timed out after 5s`));
        }, 5000);
        window.turnstileSuccessCallback = (token: string) => {
            clearTimeout(timer)
            resolve(token)
        }
    })
}
