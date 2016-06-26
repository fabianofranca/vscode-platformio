'use strict';

import * as vscode from 'vscode';
import * as platformio from './platformio';

export function activate(context: vscode.ExtensionContext) {
    //platformio -f init --board esp12e

    let io = new platformio.PlatformIO();

    let update = vscode.commands.registerCommand('platformio.update', () => {
        io.update();
    });

    let upgrade = vscode.commands.registerCommand('platformio.upgrade', () => {
        io.upgrade();
    });

    // let selectPort = commands.registerCommand('platformio.selectPort', async () => {
    //     await platformio.selectPorts().then();
    // });

    // let build = commands.registerCommand('platformio.build', async () => {
    //     await platformio.build().then();
    // });    

    context.subscriptions.push(update);
    context.subscriptions.push(upgrade);
    // context.subscriptions.push(selectPort);
    // context.subscriptions.push(build);
}

export function deactivate() {
}