console.log("Line 1");

// Callback Hell 

getUser(1, displayUser);
    

function displayUser(user){
    console.log("Returned User from Callback ",user);
    getRepositories(user.name, displayRepo);
}

function displayRepo(repos){
    console.log("Returned User from Callback ",repos);
    getCommits(repos.repositories, displayCommits);
}

function displayCommits(commits){
    console.log("Returned User from Callback ",commits);
}



function getUser(id,callback){
    setTimeout(()=>{
        callback({id:id,name:"Amna Javed"});
    },50);
};


function getRepositories(username,callback){
    setTimeout(()=>{
        callback({
            name: username,
            repositories: ["SpaceSpot","BlogApp","NodeCourse"]
        });
    },50);
};

function getCommits(repo,callback){
    setTimeout(()=>{
        callback({
            repo: repo,
            commits: [{commit1:"First Commit", commit2:"Second Commit"}]
        });
    },50);
}