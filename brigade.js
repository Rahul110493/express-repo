const { events, Job ,Group } = require("brigadier");

class JobFactory {

  nodebuildPipelineJob(e, project)
     {
       var buildcloud = new Job("buildcloud", "google/cloud-sdk:slim")
//       buildcloud.env.PRIVATE_KEY = project.secrets.private_key
//         buildcloud.env.TEST_NAME = project.secrets.test_name

       buildcloud.tasks = [
        "cd /src",
//        `echo -e '{"type": "${project.secrets.type}","project_id": "${project.secrets.project_id}","private_key_id": "${project.secrets.private_key_id}","private_key": "${project.secrets.private_key}","client_email": "${project.secrets.client_email}","client_id": "${project.secrets.client_id}","auth_uri": "${project.secrets.auth_uri}","token_uri": "${project.secrets.token_uri}","auth_provider_x509_cert_url": "${project.secrets.auth_provider_x509_cert_url}","client_x509_cert_url": "${project.secrets.client_x509_cert_url}"}' > file.json`,
        // "apt-get update",
        // "apt-get install sed -y",
        `echo '"${project.secrets.test_name}"' >file.json`,
        "ls -lart",
        "cat file.json",
        "sed 's/?/8/g' file.json",
        "cat file.json",
        `sed -zE 's/\n/\\n/g' file.json>file2.json`,
        "ls -lart",
        "cat file2.json",
//        "cat file.json",
//        "echo  $PRIVATE_KEY"
        // `gcloud auth activate-service-account ${project.secrets.client_email} --key-file=file.json`,
        // `gcloud config set project ${project.secrets.project_id}`,
        // "curl -L https://dl.k8s.io/v1.10.6/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl",
        // "chmod -R 775 /usr/local/bin/kubectl",
        // `gcloud container clusters get-credentials ${project.secrets.project_name} --region us-central1-a`,
        // "kubectl get pods"
       ]

      return buildcloud;
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
