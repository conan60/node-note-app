let noteObj=[];
const fs = require('fs');

noteObj= JSON.parse(fs.readFileSync('./data').toString());
const saveData = ()=>{
    if(noteObj)
    fs.writeFile('data',JSON.stringify(noteObj),err=>{
        console.log('Error in saving data');
    });
}



const errorList = {invalidOperation : "command not found", invalidNbrArgs : "invalid args numbers"};
let error = errorList.invalidOperation;
let operations = [
    {operation : 'read' , nbrArg : 2 },
    {operation : 'add' , nbrArg : 5 },
    {operation : 'remove' , nbrArg : 2 },
    {operation : 'list' , nbrArg : 1 },
    {operation : '--help' , nbrArg : 1 }
];



const showHelp = ()=>{
    console.log(`    --help : show help
    --title, -t : title of note
    --body, -b : body of note`);
}

const titleExist = (name,list)=>{ 
    return Boolean((list.filter(el=>el.title === name)).length);
}

const addNote = (title,body)=>{
    console.log(noteObj)
    noteObj.push({title,body});
    saveData();
    console.log('Note added with success');
}

const readNote = (title)=>{
    let note = noteObj.filter(note=>note.title === title);
    if (note) {
        console.log(`Title : ${note[0].title} \nbody : ${note[0].body}`)
    } else {
        console.log('Note not found !!');
    }
    
}

const removeNote = (title)=>{
    noteObj = noteObj.filter(note=>note.title!==title);
    console.log('Note removed with success');
    saveData();
}

const listNotes = ()=>{
    noteObj.map(({title,body},i)=>{
        console.log(`${i} -Title : ${title} || body : ${body}`);
    })
}

const displayError = (error = 'No command found')=>{
    console.log(error);

    
}


let title ;
let titleValue ;
let body ;
let bodyValue ;
let options;
let nbrArg;
let operation;
if (process.argv.slice(2).length > 0) {
    options = process.argv.slice(2);
    nbrArg = options.length;
    operation = options[0];
} else {
    displayError();
}






const errorDetect = ()=>{
    for (var elem of operations){
        if(elem.operation === operation){
            if(elem.nbrArg !== nbrArg){
                error = errorList.invalidNbrArgs;
                break;
            }else{
                if(elem.operation === 'add'){
                    title = options[1];
                    titleValue = options[2];
                    body = options[3];
                    bodyValue = options[4];
                    if ((title === '--title' || title === '-t') && (body==='--body' || body==='-b')) {
                        if(titleExist(titleValue,noteObj)){
                            console.log('Title already exist !!');
                        }else{
                            addNote(titleValue,bodyValue);
                        }
                    }else{
                        error = 'Invalid add params !!';
                    }
                }
                if(elem.operation === 'list'){
                    listNotes();
                   
                }
                if(elem.operation === 'read'){
                    let name = options[1];
                    readNote(name);
                  
                }
                if(elem.operation === 'remove'){
                    let name = options[1];
                    removeNote(name);
            
                }
                if(elem.operation === '--help'){
                    showHelp();
                
                }
                error = '';
            }
        }
    }
    return error;
}

displayError(errorDetect());




