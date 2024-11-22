import * as vscode from 'vscode';
import { Operation } from './base-operation';
import { SemicolonInString } from './operations/semicolon-in-string';
import { SemicolonInParenthesis } from './operations/semicolon-in-parenthesis';
import { LastChanges } from './last-changes';
import { CurlyBracketsInParenthesis } from './operations/curly-brackets-in-parenthesis';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let config = vscode.workspace.getConfiguration('smart-brackets');
    let lastChanges = new LastChanges();

    const operations: Operation[] = [
        new SemicolonInString(),
        new SemicolonInParenthesis(),
        new CurlyBracketsInParenthesis(),
    ];

    let activeOperations: Operation[] = [];

    function updateActiveOperations() {
        activeOperations = operations.filter(operation => {
            return config.get(operation.id + '.enable');
        });
    }

    updateActiveOperations();

    let documentChange = vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) return;

        let lastChange = event.contentChanges[0].text;
        lastChanges.addChange(lastChange);

        let document = editor.document;
        for (let operation of activeOperations) {
            editor.edit((editBuilder: vscode.TextEditorEdit) => { 
                for (let contentChange of event.contentChanges) {
                    let position = contentChange.range.start;
                    let line = document.lineAt(position.line);
    
                    if (operation.check(line.text, editor!, lastChanges)) {
                        operation.run(editBuilder, line, position);
                    }
                }
            }).then(() => {
                operation.finish(editor!);
            });
        }
    });

    let settingsChange = vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
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
