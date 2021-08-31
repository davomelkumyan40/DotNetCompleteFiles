const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context)
{
	const extension = function ()
	{
		//vscode.window.showInformationMessage('"Dot Net Complete Files" Running...');
		let folders = vscode.workspace.workspaceFolders;
		if (folders)
		{
			vscode.workspace.onDidCreateFiles(uri => uri.files.forEach(f =>
			{
				let namespace = vscode.workspace.name;
				let className = "MyClass";
				let basename = path.basename(f.fsPath).split(".");
				if (basename[basename.length - 1] === "cs")
				{
					className = basename[0]
					let template = `using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ${namespace}
{
    public class ${className}
    {
        
    }
}`;
					fs.writeFileSync(f.fsPath, template);
				}

			}));
		}
	};

	extension();

	let disposable = vscode.commands.registerCommand('dot-net-complete-files.DotNetCompleteFiles', extension);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
