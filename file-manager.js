var fs = require('fs');

var useStdin = function() {
	var input = process.stdin.read();
	if (input !== null) {
		var inputSplit = input.toString().trim().split(" ");
		if (inputSplit[0] == "cat") {
			//cat <filename>
			catFile(inputSplit[1]);
		} else if (inputSplit[0] == "touch") {
			//touch <filename>
			createNewFile(inputSplit[1]);
			// start BCD
		} else if (inputSplit[0] == "exit") {
			process.exit();			
		} else if (inputSplit[0] == "rm") {
			deleteFile(inputSplit[1]);
		} else if (inputSplit[0] == "replace") {
			findReplace(inputSplit[1], inputSplit[2], inputSplit[3]);
		} else if (inputSplit[0] == "grep") {
			findWordInLine(inputSplit[1], inputSplit[2]);
		}
		// exit BCD
	}
};

//read from a file (cat)
function catFile(fileName) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			console.log(data.toString());
		}
	});
}

//create a file (touch)
function createNewFile(fileName) {
	fs.writeFile(fileName, "", function(err){
		if (err) {
			console.log("Could not write to file");
		} else {
			console.log("File created and saved");
		}
	});
}
// start BCD
// delete a file (rm)
function deleteFile(fileName) {
	fs.unlink(fileName, function(err, data) {
		if (err) {
			console.log("Unable to delete file");
		} else {
			console.log("File successfully deleted");
		}
	});
}
// find and replace
function findReplace(fileToSearch, wordToReplace, replacementWord) {
		var data = fs.readFile(fileToSearch, function(err, data) {
			if (err) {
				console.log("Unable to read from file");
			} else {
				var newData = data.toString().split(wordToReplace).join(replacementWord);
				fs.writeFile("hello.txt", newData, function(err) {
					if (err) {
						console.log("Could not write to file");
					} else {
						console.log("Replaced \"" + wordToReplace + "\" with \"" + replacementWord + "\" successfully.");
					}
				});
			}
		});
}

// find a word in a line
function findWordInLine(wordToFind, fileToSearch) {
		var data = fs.readFile(fileToSearch, function(err, data) {
			if (err) {
				console.log("Unable to read from file");
		} else {
			var newData = data.toString().split(/\r?\n/);		
			var lines = [];
			for(i in newData) {
				if (newData[i].includes(wordToFind)) {
					console.log(newData[i]);
				}
			}
		}
	});
}
// end BCD

process.stdin.on('readable', useStdin);

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt


	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

