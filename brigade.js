const { events, Job } = require("brigadier");


events.on("push", function(e, project) {
  console.log("received push for commit " + e.revision.commit)

  var nodeBuild = new Job("nodeBuild")
  nodeBuild.image = "node:10.15.0-slim"

  nodeBuild.tasks = [
    "cd /src/", 
    "npm install",
    "npm start"
  ]
  
  nodeBuild.run()
  

  })
