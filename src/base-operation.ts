import { Position, TextEditor, TextLine, WorkspaceConfiguration } from "vscode";

export abstract class Operation {
    public abstract id: string;
    public abstract check(text: string): boolean;
    public abstract run(editor: TextEditor, line: TextLine, position: Position): void;
}