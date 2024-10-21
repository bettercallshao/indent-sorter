// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { IndentSorter } from './indent-sorter';
import { FirstCharacterAligner } from './first-character-aligner';
import { AfterFirstCharacterAligner } from './after-first-character-aligner';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const getSelection = () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const userSelection = editor.selection;
		const startLine = userSelection.start.line;
		const endLine = userSelection.end.line;

		// Create a new selection range covering the entire lines
		return new vscode.Selection(startLine, 0, endLine, editor.document.lineAt(endLine).text.length);
	};

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "indent-sorter" is now active!');

	const indentSorter = new IndentSorter();
	const firstCharacterAligner = new FirstCharacterAligner();
	const afterFirstCharacterAligner = new AfterFirstCharacterAligner();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	context.subscriptions.push(vscode.commands.registerCommand('indent-sorter.indentSort', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const selection = getSelection();
		if (!selection) {
			return;
		}

		const original = editor.document.getText(selection);
		const ordered = indentSorter.perform(original);

		editor.edit(editBuilder => {
			editBuilder.replace(selection, ordered);
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand('indent-sorter.alignFirstCharacter', async () => {
		// Show an input box to the user
		const target = await vscode.window.showInputBox({
			placeHolder: "Character or string to align"
		});

		if (!target) {
			return;
		}

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const selection = getSelection();
		if (!selection) {
			return;
		}

		const original = editor.document.getText(selection);
		const aligned = firstCharacterAligner.perform(original, target);

		editor.edit(editBuilder => {
			editBuilder.replace(selection, aligned);
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand('indent-sorter.alignAfterFirstCharacter', async () => {
		// Show an input box to the user
		const target = await vscode.window.showInputBox({
			placeHolder: "Character or string to align after"
		});

		if (!target) {
			return;
		}

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const selection = getSelection();
		if (!selection) {
			return;
		}

		const original = editor.document.getText(selection);
		const aligned = afterFirstCharacterAligner.perform(original, target);

		editor.edit(editBuilder => {
			editBuilder.replace(selection, aligned);
		});
	}));
}

// This method is called when your extension is deactivated
export function deactivate() { }
