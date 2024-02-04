import { Position, TextEditor, TextLine, WorkspaceConfiguration } from "vscode";

export abstract class Operation {
    /**
     * The unique identifier for this operation. This is used to enable/disable the operation in the settings.
     */
    public abstract id: string;
    
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
    public abstract check(text: string, editor: TextEditor): boolean;

    /**
     * Runs the operation on the current line.
     * 
     * @param editor current active text editor (vscode.window.activeTextEditor)
     * @param line the current line
     * @param position the position of the cursor
     */
    public abstract run(editor: TextEditor, line: TextLine, position: Position): void;
}