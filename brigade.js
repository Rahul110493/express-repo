const { events, Job ,Group } = require("brigadier");



class JobFactory {
  nodebuildPipelineJob(e, project) {
    var nodebuild = new Job("nodebuild", "node:10.15.0-slim")
    nodebuild.storage.enabled = true

   
    nodebuild.tasks = [
      "cd /src/",
      "pwd",
      "apt-get update && apt-get --assume-yes install git-core",
      "git config --global user.email 'dandevops@az.devops.gdpdentsu.net'",
      "git config --global user.name 'DAN Devops'",
      "git config --global credential.helper 'store --file ~/.git-credentials",
      `echo https://${project.secrets.user}:${project.secrets.pwd}@github.com/Rahul110493 > ~/.git-credentials`,
      "git fetch --tags -q",
      "./gitversion --prefix d bump auto && ./gitversion --prefix d show > /mnt/brigade/share/pipeline_app_version.txt",
      "echo Cheching the mnt",
      "cat /mnt/brigade/share/pipeline_app_version.txt",
      "git push --tags >/dev/null 2>&1",     
      "npm install",
      "npm start",
 

    ]

    return nodebuild;
  }

  createTestJob(e, project) {
    // TODO: If not "node", specify alternative docker container for your build
    var Test = new Job("test", "node:10.15.0-slim")
    Test.storage.enabled = true

    Test.tasks = [
      "cat /mnt/brigade/share/pipeline_app_version.txt"
    ]

    return Test;
  }
}



  events.on("push", (e, project) => {
    let jobFactory = new JobFactory()
    var jsonPayload = JSON.parse(e.payload);
    console.log(e)
  
    // Run relevant stages
    if (e.type == 'push') {
      if (jsonPayload.ref == "refs/heads/develop") {
        Group.runEach([
          jobFactory.nodebuildPipelineJob(e, project),
          jobFactory.createTestJob(e, project),

        ])
      } else if (jsonPayload.ref == "refs/heads/master") {
        console.log("Ignoring Master Push")
      } 
    } else if (e.type == 'pull_request') {
      console.log("Ignoring PULL REQUEST")
    }
  })
