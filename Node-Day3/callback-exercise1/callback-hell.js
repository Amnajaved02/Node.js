console.log("Line 1");

// Callback Hell 

getUser(1, (returned)=> {
    console.log("Returned User from Callback ",returned);
    
    getRepositories(returned.name, (repos)=> {
        console.log("Returned Repos for User from Callback ",repos);

        getCommits(repos.repositories[0],(commits)=>{
            console.log("Returned Comits for SpaceSpot from Callback ",commits);
        });

    });

});


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