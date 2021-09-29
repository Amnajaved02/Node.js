console.log("Line 1");

getUser(1, (returned)=> {
    console.log("Returned from Callback ",returned);
});

function getUser(id,callback){
    setTimeout(()=>{
        callback({id:id,name:"Amna Javed"});
    },50);
};

console.log('Line 13')

for (let i = 0; i < 40; i++) {
    console.log(`in loop i :${i}`)
  }

for (let j = 0; j < 40; j++) {
    console.log(`in loop j: ${j}`)
  }

for (let k = 0; k < 40; k++) {
    console.log(`in loop k: ${k}`)
  }

getUser2(1, (returned)=> {
    console.log("Returned from Callback ",returned);
});

console.log('line 31')

function getUser2(id,callback){
    setTimeout(()=>{
        callback({id:id,name:"Amna Javed"});
    },50);
};
