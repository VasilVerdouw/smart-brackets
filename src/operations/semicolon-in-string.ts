import { TextEditor, TextLine, Position, Selection, TextEditorEdit } from 'vscode';
import { Operation } from '../base-operation';
import { LastChanges } from '../last-changes';

export class SemicolonInString extends Operation {
    id = 'semicolon-in-string';
    supportedLanguages = [];

    public check(text: string, editor: TextEditor, lastChanges: LastChanges): boolean {
        if (!this.supportsCurrentLanguage(editor)) {
            return false;
        }

        if (lastChanges.getLatestChange() != ';') {
            return false;
        }

        return text.endsWith(';"') || text.endsWith(";'") || text.endsWith(';")') || text.endsWith(";')") || text.endsWith(';"))') || text.endsWith(";'))");
    }

    public run(editBuilder: TextEditorEdit, line: TextLine): void {
        let newText = '';
        if (line.text.endsWith(';"') || line.text.endsWith(";'")) {
            newText = line.text.slice(0, line.text.length - 2) + line.text.slice(line.text.length - 1) + ';';
        } else if (line.text.endsWith(';")') || line.text.endsWith(";')")) {
            newText = line.text.slice(0, line.text.length - 3) + line.text.slice(line.text.length - 2) + ';';
        } else if (line.text.endsWith(';"))') || line.text.endsWith(";'))")) {
            newText = line.text.slice(0, line.text.length - 4) + line.text.slice(line.text.length - 3) + ';';
        }
        this.changedLines.push(line.lineNumber);
        editBuilder.replace(line.range, newText);
    }

    protected newLineSelection(line: TextLine): Selection {
        let newCursorPosition = new Position(line.lineNumber, line.text.length);
        return new Selection(newCursorPosition, newCursorPosition);
    }
}
