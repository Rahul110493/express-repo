const { events, Job ,Group } = require("brigadier");



class JobFactory {

  nodebuildPipelineJob(e, project)
     {
       var buildcloud = new Job("buildcloud", "google/cloud-sdk:slim")

       buildcloud.tasks = [
        "cd /src",
        `echo '{"type": "${type}","project_id": "${project_id}","private_key_id": "${private_key_id}","private_key": "${private_key}","client_email": "${client_email}","client_id": "${client_id}","auth_uri": "${auth_uri}","token_uri": "${token_uri}","auth_provider_x509_cert_url": "${auth_provider_x509_cert_url}","client_x509_cert_url": "${client_x509_cert_url}"}' > file.json`,
        "cat file.json",
        `gcloud auth activate-service-account ${client_email} --key-file=file.json`,
        `gcloud config set project ${project_id}`,
        "curl -L https://dl.k8s.io/v1.10.6/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl",
        "chmod -R 775 /usr/local/bin/kubectl",
        `gcloud container clusters get-credentials ${project} --region us-central1-a`,
        "kubectl get pods"
       ]
     }
  // nodebuildPipelineJob(e, project) {
  //   var nodebuild = new Job("nodebuild", "node:10.15.0-slim")
  //   nodebuild.storage.enabled = true


  //   nodebuild.tasks = [
  //     "cd /src/",
  //     "pwd",
  //     "apt-get update && apt-get --assume-yes install git-core",
  //     "git config --global user.email 'dandevops@az.devops.gdpdentsu.net'",
  //     "git config --global user.name 'DAN Devops'",
  //     "git config --global credential.helper 'store --file ~/.git-credentials",
  //     `echo https://${project.secrets.user}:${project.secrets.pwd}@github.com/Rahul110493 > ~/.git-credentials`,
  //     "git fetch --tags -q",
  //     "./gitversion --prefix d bump auto && ./gitversion --prefix d show ",
  //     "echo Cheching the mnt",
  //     "git push --tags >/dev/null 2>&1",
  //     "npm install",
  //     "npm start",


  //   ]

  //   return nodebuild;
  // }

//   createTestJob(e, project) {
//     // TODO: If not "node", specify alternative docker container for your build
//     var Test = new Job("test", "node:10.15.0-slim")
//     Test.storage.enabled = true

//     Test.tasks = [
// //      "cat /mnt/brigade/share/pipeline_app_version.txt"
//     ]

//     return Test;
//   }
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
//          jobFactory.createTestJob(e, project),

        ])
      } else if (jsonPayload.ref == "refs/heads/master") {
        console.log("Ignoring Master Push")
      }
    } else if (e.type == 'pull_request') {
      console.log("Ignoring PULL REQUEST")
    }
  })
