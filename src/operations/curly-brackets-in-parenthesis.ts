import { TextEditor, TextLine, Position, Selection, TextEditorEdit } from "vscode";
import { Operation } from "../base-operation";
import { LastChanges } from "../last-changes";

export class CurlyBracketsInParenthesis extends Operation {
    public id = 'curly-brackets-in-parenthesis';
    // Experimental: This operation is not yet enabled by default because it's unknown
    // if it can be annoying in certain languages and situations.
    protected supportedLanguages = [];

    public check(text: string, editor: TextEditor, lastChanges: LastChanges): boolean {
        if (!this.supportsCurrentLanguage(editor)) {
            return false;
        }

        // The second to last text.match should avoid the operation being run in some cases when it shouldn't.
        // Like callback functions for example.
        // JS example: "someFunction(() => {})" should not be changed.
        // See: regexr.com/7sgi8

        // This last text.match should avoid the operation being run in some cases when it shouldn't.
        // Dart example: "Button(onPressed: () {})" should not be changed.
        // See: regexr.com/7sghs
        if (!lastChanges.lastChangesEqualTo(' ', '{}')
            || text.endsWith(', {})')
            || text.endsWith(', {}))') 
            || text.endsWith('(() {})') 
            || text.match(/( |,|\()+(\(\)) ?(=>)? ?(async)? ?{}(\))+/) !== null
            || text.match(/([a-zA-z])*: ?(\(\))? ?(async)? ?(=>)? ?{} ?\)+/) !== null) {
            return false;
        }

        return text.endsWith(' {})') || text.endsWith(' {}))');
    }

    public run(editor: TextEditor, line: TextLine, position: Position): void {
        let newText = '';
        if (line.text.endsWith(' {})')) {
            newText = line.text.slice(0, line.text.length - 4) + ') {}';
        } else if (line.text.endsWith(' {}))')) {
            newText = line.text.slice(0, line.text.length - 5) + ')) {}';
        }
        let newCursorPosition = new Position(position.line, newText.length - 1);

        editor.edit((editBuilder: TextEditorEdit) => {
            editBuilder.replace(line.range, newText);
        }).then(() => {
            editor.selection = new Selection(newCursorPosition, newCursorPosition);
        });
    }

}