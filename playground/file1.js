const msg=require('./file2')// returned value is assigned to variable, as it was single export,we dont get an object
const {note,note1}=require('./file3')// returned value is an object, and we do object de-structuring, as we have multiple exports
const file4=require('./file4')// the entire returned object is put in the variable called as file 4
const file5=require('./file5')
console.log(msg)
console.log(note,note1)
console.log(file4.info,file4.anotherInfo)
console.log(file5.info)