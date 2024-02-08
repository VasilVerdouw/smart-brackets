import * as vscode from 'vscode';
import { Operation } from './base-operation';
import { SemicolonInString } from './operations/semicolon-in-string';
import { SemicolonInParenthesis } from './operations/semicolon-in-parenthesis';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let config = vscode.workspace.getConfiguration('smart-brackets');

    const operations: Operation[] = [
        new SemicolonInString(),
        new SemicolonInParenthesis()
    ];

    let activeOperations: Operation[] = [];

    function updateActiveOperations() {
        activeOperations = operations.filter(operation => {
            return config.get(operation.id + '.enable');
        });
    }

    let lastCursorPosition: vscode.Position | undefined;

    updateActiveOperations();

    let documentChange = vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        };

        let document = editor.document;
        let line = document.lineAt(event.contentChanges[0].range.start.line);
        let position = event.contentChanges[0].range.start;

        // Checks if user is typing, we check this to make sure user actually
        // accidentally typed a semicolon and it wasn't placed on purpose.
        if ((lastCursorPosition && (lastCursorPosition.isEqual(position) || lastCursorPosition.isEqual(position.translate(0, 1))))) {
            lastCursorPosition = position;
            return;
        }
        lastCursorPosition = position;
        
        for (let operation of activeOperations) {
            if (operation.check(line.text, editor)) {
                operation.run(editor, line, position);
                return;
            }
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
