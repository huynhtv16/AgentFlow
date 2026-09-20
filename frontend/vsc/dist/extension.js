"use strict";var l=Object.create;var r=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var g=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty;var m=(o,e)=>{for(var t in e)r(o,t,{get:e[t],enumerable:!0})},a=(o,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of v(e))!p.call(o,s)&&s!==t&&r(o,s,{get:()=>e[s],enumerable:!(n=d(e,s))||n.enumerable});return o};var h=(o,e,t)=>(t=o!=null?l(g(o)):{},a(e||!o||!o.__esModule?r(t,"default",{value:o,enumerable:!0}):t,o)),u=o=>a(r({},"__esModule",{value:!0}),o);var x={};m(x,{activate:()=>w,deactivate:()=>b});module.exports=u(x);var i=h(require("vscode")),c=class{constructor(e){this._extensionUri=e}resolveWebviewView(e,t,n){e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},e.webview.html=this._getHtmlForWebview(e.webview)}_getHtmlForWebview(e){let t=e.asWebviewUri(i.Uri.joinPath(this._extensionUri,"assets","RA.png")),n=f();return`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${e.cspSource} https:; style-src ${e.cspSource} 'unsafe-inline'; script-src 'nonce-${n}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AgentFlow</title>
        <style>
          body {
            padding: 0;
            color: var(--vscode-foreground);
            font-size: var(--vscode-font-size);
            font-weight: var(--vscode-font-weight);
            font-family: var(--vscode-font-family);
            background-color: var(--vscode-editor-background);
          }
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
          }
          .logo {
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
          }
          h1 {
            color: var(--vscode-editor-foreground);
            font-size: 1.3em;
            margin-bottom: 15px;
          }
          p {
            color: var(--vscode-foreground);
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="${t}" alt="AgentFlow Logo" class="logo">
          <h1>AgentFlow</h1>
          <p>Your research and development assistant.</p>
          <p>More features coming soon!</p>
        </div>
      </body>
      </html>`}};function f(){let o="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let t=0;t<32;t++)o+=e.charAt(Math.floor(Math.random()*e.length));return o}function w(o){console.log('Congratulations, your extension "agentflow" is now active!');let e=new c(o.extensionUri),t=i.window.registerWebviewViewProvider("agentflow.view",e);o.subscriptions.push(t);let n=i.commands.registerCommand("agentflow.helloWorld",()=>{i.window.showInformationMessage("Hello World from AgentFlow!")});o.subscriptions.push(n)}function b(){}0&&(module.exports={activate,deactivate});
