import { TextEditor, TextLine, Position, Selection, TextEditorEdit } from 'vscode';
import { Operation } from '../base-operation';
import { LastChanges } from '../last-changes';

export class SemicolonInParenthesis extends Operation {
    id = 'semicolon-in-parenthesis';
    supportedLanguages = [];

    public check(text: string, editor: TextEditor, lastChanges: LastChanges): boolean {
        if(!this.supportsCurrentLanguage(editor)) {
            return false;
        }

        if(lastChanges.getLatestChange() != ';') {
            return false;
        }

        // Make sure the text ends with a semicolon and a parenthesis
        // but isn't just a for loop or something similar
        return (text.endsWith(';)') || text.endsWith(';))')|| text.endsWith(';)))') || text.endsWith(';))))')) && !text.trimStart().startsWith('for');
    }

    public run(editor: TextEditor, line: TextLine, position: Position): void {
        let newText = '';
        if(line.text.endsWith(';)')) {
            newText = line.text.slice(0, line.text.length - 2) +  ');';
        } else if(line.text.endsWith(';))')) {
            newText = line.text.slice(0, line.text.length - 3) +  '));';
        } else if(line.text.endsWith(';)))')) {
            newText = line.text.slice(0, line.text.length - 4) +  ')));';
        } else if(line.text.endsWith(';))))')) {
            newText = line.text.slice(0, line.text.length - 5) +  ')))));';
        }

        let newCursorPosition = new Position(position.line, newText.length);

        editor.edit((editBuilder: TextEditorEdit) => {
            editBuilder.replace(line.range, newText);
        }).then(() => {
            editor.selection = new Selection(newCursorPosition, newCursorPosition);
        });
    }
}
