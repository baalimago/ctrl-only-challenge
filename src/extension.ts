import * as vscode from 'vscode';
const cp = require('child_process');
const path = require("path");

export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
		queueMeow();
	  });

	context.subscriptions.push(disposable);
}

const _playerWindowsPath = path.join(__dirname, '..', 'media', 'player.exe');
const filePath = `${__dirname}\\..\\media\\meow.mp3`;	
var amMeows=0;
var meowActive = false;
function queueMeow() {
	if(meowActive){
		amMeows++;
	} else {
		amMeows++;
		meowLoop();
		meowActive= true;
	}
}

function meowLoop(){
	if(amMeows > 0) {
		cp.execFile(_playerWindowsPath, [filePath]);
		amMeows--;
		vscode.window.showInformationMessage(`Meows left: ${amMeows}`);
		setTimeout(meowLoop, 1200);
	} else {
		meowActive = false;
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
