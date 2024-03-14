const bcrypt = require('bcrypt');
var rounds=10;

// Function to hash a password
async function hashPass(pass){
    let salt= await bcrypt.genSalt(rounds);
    let hash = await bcrypt.hash(pass,salt);
    return hash;
}

// Function to compare a password with a hash
async function comparePass(pass,hash){
    // console.log(decr);
    let ans= await bcrypt.compare(pass,hash);
    return ans;
}
async function test(userPass,newPass){
    let h1=await hashPass(userPass);
    console.log(h1);
    let h2=await bcrypt.compare(newPass,h1);
    console.log(h2);
}
test('hello','hello');
// Exporting the hashPass and comparePass functions to make them available to other modules
module.exports={hashPass,comparePass};