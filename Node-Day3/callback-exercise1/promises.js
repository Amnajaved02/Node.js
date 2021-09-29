
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

// const p= getUser(1);
// p.then(user => console.log('User',user));

getUser(1)
    // .then(user => console.log('User',user))
    .then(user => getRepositories(user.name))
    // .then(repo => console.log('Repository',repo))
    .then(repo => getCommits(repo.repositories[0]))
    .then(commits => console.log('Commits',commits))


function getUser(id){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve({id:id,name:"Amna Javed"});
        },50);
    });
};

function getRepositories(username){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve({
                name: username,
                repositories: ["SpaceSpot","BlogApp","NodeCourse"]
            });
        },50);
    });
};

function getCommits(repo){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve({
            repo: repo,
            commits: [{commit1:"First Commit", commit2:"Second Commit"}]
            });
        },50);
    });
};