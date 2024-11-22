import { Position, Selection, TextEditor, TextEditorEdit, TextLine, WorkspaceConfiguration } from "vscode";
import { LastChanges } from "./last-changes";

export abstract class Operation {
    /**
     * The unique identifier for this operation. This is used to enable/disable the operation in the settings.
     */
    public abstract id: string;
    
    /**
     * The lines the operation has changed when since the last time finish() was called.
     */
    protected changedLines: number[] = [];
    
    /**
     * The languages that this operation supports. If empty, the operation will run on all languages.
     */
    protected abstract supportedLanguages: string[];

    /**
     * Checks if the current language is supported by this operation.
     * 
     * @param editor current active text editor (vscode.window.activeTextEditor)
     * @returns true if the current language is supported by this operation, false if it is not.
     */
    protected supportsCurrentLanguage(editor: TextEditor): boolean {
        return this.supportedLanguages.length === 0 || this.supportedLanguages.includes(editor.document.languageId);
    }

    /**
     * Checks if the operation should run on the current line.
     * We check this before running the operation to avoid unnecessary operations
     * and to avoid running multiple operations on the same line.
     * 
     * @param text the text of the line
     * @param editor current active text editor (vscode.window.activeTextEditor)
     * @returns true if the operation should run on the current line, false if it should not.
     */
    public abstract check(text: string, editor: TextEditor, lastChanges: LastChanges): boolean;

    /**
     * Runs the operation on the current line.
     * 
     * @param editBuilder current active edit builder
     * @param line the current line
     * @param position the position of the cursor
     */
    public abstract run(editBuilder: TextEditorEdit, line: TextLine, position: Position): void;

    /**
     * Finishes the operation. This is called after all operations have run on all lines.
     * 
     * @param editor current active text editor (vscode.window.activeTextEditor)
     */
    public finish(editor: TextEditor): void {
        editor.selections = editor.selections.map(selection => {
            if (this.changedLines.includes(selection.active.line)) {
                return this.newLineSelection(editor.document.lineAt(selection.active.line));
            } else {
                return selection;
            }
        });
        this.changedLines = [];
    }

    /**
     * Returns a new selection for a line that has been changed by this operation.
     * For example, if the operation adds a character to the end of the line, this method
     * should return a selection that puts the cursor at the end of the line.
     * 
     * @param line the next line
     * @returns a new selection for the next line
     */
    protected abstract newLineSelection(line: TextLine): Selection;
}