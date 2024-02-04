// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Operation } from './base-operation';
import { SemicolonInString } from './operations/semicolon-in-string';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let config = vscode.workspace.getConfiguration('smart-brackets');
    
    const operations: Operation[] = [
        new SemicolonInString()
    ];

    let activeOperations: Operation[] = [];

    function updateActiveOperations() {
        activeOperations = operations.filter(operation => {
            return config.get(operation.id + '.enable');
        });
    }

    updateActiveOperations();

    let documentChange = vscode.workspace.onDidChangeTextDocument((event) => {
        let editor = vscode.window.activeTextEditor;
        if(!editor) return;

        let document = editor.document;
        let line = document.lineAt(event.contentChanges[0].range.start.line);
        let position = event.contentChanges[0].range.start;

        for (let operation of activeOperations) {
            if (operation.check(line.text)) {
                operation.run(editor, line, position);
                return;
            }
        }
    });

    let settingsChange = vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('smart-brackets')) {
            config = vscode.workspace.getConfiguration('smart-brackets');
            updateActiveOperations();
        }
    });

    context.subscriptions.push(documentChange);
    context.subscriptions.push(settingsChange);
}

// This method is called when your extension is deactivated
export function deactivate() { }
