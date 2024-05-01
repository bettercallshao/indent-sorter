import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('indent-sorter should sort the selected text', async () => {
		const content = `

		# With Z comment
		def Z method():
		end

		def B method():
		end

		def A method():
		end


`;

		const expectedText = `

		def A method():
		end

		def B method():
		end

		# With Z comment
		def Z method():
		end


`;

		// Open a new text document
		const document = await vscode.workspace.openTextDocument({ content });
		const editor = await vscode.window.showTextDocument(document);

		// Define the text range to select
		const selectionRange = new vscode.Range(0, 0, document.lineCount, 0);
		editor.selection = new vscode.Selection(selectionRange.start, selectionRange.end);

		// Execute the indentSort command
		await vscode.commands.executeCommand('indent-sorter.indentSort');

		// Wait a moment for the command to execute (if it's asynchronous)
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Get the current text of the document
		const textAfterCommand = document.getText();

		// Assert that the sorted text matches expected output
		assert.strictEqual(textAfterCommand, expectedText, 'The sorted text does not match the expected output.');
	});
});
