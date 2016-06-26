"use strict";

import * as vscode from 'vscode';

export class PlatformIO {
    private outputChannel: vscode.OutputChannel;
    // private statusBarItem: StatusBarItem;
    private port: string;

    private COMMAND = 'platformio ';
    private UPDATE = 'update';
    private UPGRADE = 'upgrade';
    // private LIST_PORTS = ' serialports list --json-output';

    constructor() {
        this.outputChannel = vscode.window.createOutputChannel('PlatformIO');
        // this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);        
    }

    private run(params: string, out: (data) => void, err?: (data) => void, close?: (code) => void) {
        let exec = require('child_process').exec;
        
        let process = exec(this.COMMAND + ' ' + params);

        process.stdout.on('data', out);

        if (err) {
            process.stderr.on('data', err);
        }

        if (close) {
            process.on('close', close);
        }
    }

    public update() {
        var me = this;
        var tag = 'PlatformIO - Update';

        this.outputChannel.clear();
        this.outputChannel.show();
        this.outputChannel.appendLine('[' + tag + ']');

        this.run(this.UPDATE, (result) => {
            me.outputChannel.append(result);
        });
    }

    public upgrade() {
        var me = this;
        var tag = 'PlatformIO - Upgrade';

        this.outputChannel.clear();
        this.outputChannel.show();
        this.outputChannel.appendLine('[' + tag + ']');

        this.run(this.UPGRADE, (result) => {
            me.outputChannel.append(result);
        });
    }

    // public async selectPorts(): Promise<void> {
    //     var me = this;

    //     new Promise<void>(async (resolve, reject) => {            
    //         var tag = 'platformio.selectPort';

    //         me.run(
    //             me.LIST_PORTS,
    //             (data) => {
    //                 var rawPorts = JSON.parse(data);
                    
    //                 let ports: Array<string> = new Array<string>(); 

    //                 for (let p of rawPorts) {
    //                     ports.push(p.port);
    //                 }

    //                 if (ports.length > 0) {
    //                     window.showQuickPick(ports)
    //                         .then(p => { 
    //                             me.port = p;

    //                             me.statusBarItem.text = `PlatformIO Port: ${me.port}`;
    //                             me.statusBarItem.show();
    //                         });
    //                 } else {
    //                     me.statusBarItem.hide();
    //                     me.port = undefined;
    //                     window.showErrorMessage('[PlatformIO] Device not connected');                        
    //                 }
    //             },
    //             (data) => {
    //                 me.showOutput(tag, data);
    //                 window.showErrorMessage('[PlatformIO Error 1] Ops! Houston we have a problem...');
    //             }) 
    //     });
    // }

    // public async build(): Promise<void> {
    //     console.log(`PlatformIO Port: ${this.port}`);
    // }
}