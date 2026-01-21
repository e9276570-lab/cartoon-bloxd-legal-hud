// ==UserScript==
// @name         Cartoon Bloxd YT - Legal HUD
// @namespace    https://tampermonkey.net/
// @version      1.1
// @description  HUD légal Bloxd.io : Heure, FPS, Ping + Aim Assist visuel
// @match        https://bloxd.io/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /* ================= HUD ================= */

    const hud = document.createElement("div");
    hud.style.position = "fixed";
    hud.style.top = "10px";
    hud.style.left = "10px";
    hud.style.color = "white";
    hud.style.fontFamily = "Arial, sans-serif";
    hud.style.fontSize = "14px";
    hud.style.background = "rgba(0,0,0,0.55)";
    hud.style.padding = "10px";
    hud.style.borderRadius = "8px";
    hud.style.zIndex = "9999";
    hud.style.minWidth = "180px";
    document.body.appendChild(hud);

    /* ================= HEURE ================= */

    function updateTime() {
        return new Date().toLocaleTimeString();
    }

    /* ================= FPS ================= */

    let fps = 0;
    let frames = 0;
    let lastTime = performance.now();

    function updateFPS() {
        const now = performance.now();
        frames++;
        if (now - lastTime >= 1000) {
            fps = frames;
            frames = 0;
            lastTime = now;
        }
        requestAnimationFrame(updateFPS);
    }
    updateFPS();

    /* ================= PING ================= */

    let ping = "N/A";
    setInterval(() => {
        const start = performance.now();
        fetch(location.href, { method: "HEAD", cache: "no-store" })
            .then(() => ping = Math.round(performance.now() - start) + " ms")
            .catch(() => ping = "N/A");
    }, 2000);

    /* ================= CROSSHAIR (Aim Assist VISUEL) ================= */

    const crosshair = document.createElement("div");
    crosshair.style.position = "fixed";
    crosshair.style.left = "50%";
    crosshair.style.top = "50%";
    crosshair.style.width = "8px";
    crosshair.style.height = "8px";
    crosshair.style.marginLeft = "-4px";
    crosshair.style.marginTop = "-4px";
    crosshair.style.border = "2px solid red";
    crosshair.style.borderRadius = "50%";
    crosshair.style.zIndex = "9999";
    document.body.appendChild(crosshair);

    function aimAssistVisual() {
        crosshair.style.borderColor = Math.random() > 0.96 ? "lime" : "red";
        requestAnimationFrame(aimAssistVisual);
    }
    aimAssistVisual();

    /* ================= HUD UPDATE ================= */

    setInterval(() => {
        hud.innerHTML = `
        <div style="text-align:center; font-weight:bold; color:#00ffcc; font-size:16px;">
            🎮 Cartoon Bloxd YT
        </div>
        <hr style="border:0; height:1px; background:#555; margin:6px 0;">
        ⏰ Heure : ${updateTime()}<br>
        🎮 FPS : ${fps}<br>
        📶 Ping : ${ping}<br>
        🎯 Aim Assist : Visuel (Légal)
        `;
    }, 200);

})();
