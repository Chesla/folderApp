import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";
class FolderStores extends EventEmitter{
	constructor(){
		super();
		this.folder={
			
		};
	}
	
	getFolders(url){
		let folders = this.folder;
		if(!url){
			return Object.keys(folders);
		}else{
			let dept = "['"+url.split('/').join("']['")+"']";
			let tempFolder = eval('folders'+dept);
			return Object.keys(tempFolder||{});
		}
	}
	createFolder(url,newName){
		
		let folders = this.folder;
		if(!url){
			let names = Object.keys(folders);
			if(names.indexOf(newName)!==-1){
				newName = newName+names.length;
			}
			folders[newName]={};
		}else{
			let dept = "['"+url.split('/').join("']['")+"']";
			let tempFolder = eval('folders'+dept);
			let names = Object.keys(tempFolder);

			if(names.indexOf(newName)!==-1){
				newName = newName+names.length;
			}
			tempFolder[newName] = {};
		}
		this.emit('change','NEW_FOLDER');
		
	}
	renameFolder(oldName,newName,url){
		let folders = this.folder;
		
		if(!url){
			let names = Object.keys(folders);
			if(names.indexOf(newName)!==-1){
				window.alert(`The name ${newName} is already taken. Please choose a different name`);
				this.emit('change','RENAME_FOLDER_ERR',url);
				return false;
			}
			folders[newName] = folders[oldName];
			delete folders[oldName];
		}else{
			let newUrl = url.substring(1);
			let dept = "['"+newUrl.split('/').join("']['")+"']";
			let tempFolder = eval('folders'+dept);
			let names = Object.keys(tempFolder);
			if(names.indexOf(newName)!==-1){
				window.alert(`The name ${newName} is already taken. Please choose a different name`);
				this.emit('change','RENAME_FOLDER_ERR',url);
				return false;
			}
			tempFolder[newName] = tempFolder[oldName];
			delete tempFolder[oldName];
		}
		this.emit('change','RENAME_FOLDER',url);
	}
	_handleActions(action){
		
	}
}

const folderStores = new FolderStores;
dispatcher.register(folderStores._handleActions.bind(folderStores));
export default folderStores;
