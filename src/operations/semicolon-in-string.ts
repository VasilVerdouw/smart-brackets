import { TextEditor, TextLine, Position, Selection, WorkspaceConfiguration } from 'vscode';
import { Operation } from '../base-operation';

export class SemicolonInString extends Operation {
    public id = 'semicolon-in-string';

    public check(text: string): boolean {
        return text.endsWith(';"') || text.endsWith(";'");
    }

    public run(editor: TextEditor, line: TextLine, position: Position): void {
        let newText = line.text.slice(0, line.text.length - 2) + line.text.slice(line.text.length - 1) + ';';
        let newCursorPosition = new Position(position.line, newText.length);
        editor.edit(editBuilder => {
            editBuilder.replace(line.range, newText);
        }).then(() => {
            editor.selection = new Selection(newCursorPosition, newCursorPosition);
        });
    }

}