const fs = require('fs');

let rawData = fs.readFileSync('reps.json');
let rep = JSON.parse(rawData)

for(let i = 0; i < rep.length; i++) {
    let fileContent = `---\nname: ${rep[i].name}\ncustomer_id: ${rep[i].customerId}\nemail:\nphone_number:\nprofile_photo:\n---\n`;
    fs.writeFile(`./content/representatives/representative/${rep[i].customerId}.md`, fileContent, (error) => {
        if(error) {
            console.log(error)
        }
    });
}