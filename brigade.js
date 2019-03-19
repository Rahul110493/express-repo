const { events, Job, Group } = require("brigadier");

class JobFactory {

  nodebuildPipelineJob(e, project) {
    var buildcloud = new Job("buildcloud", "google/cloud-sdk:slim")

    // let values = {
    //   port: 9000,
    //   image: {
    //     tag: "${APP_VER}",
    //     repository: `${project.secrets.app_container_reg}/${project.secrets.app_name}`
    //   },
    
    // }
    //       buildcloud.env.PRIVATE_KEY = project.secrets.private_key
    //         buildcloud.env.TEST_NAME = project.secrets.test_name
    //  To Replace new line with escape character \n
    buildcloud.tasks = [

      "cd /src",
      "mkdir extra && cd extra",
       `echo -e '{"type": "${project.secrets.type}","project_id": "${project.secrets.project_id}","private_key_id": "${project.secrets.private_key_id}","private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDC/OdG1ElwdhRt\nFrWshKEZzHWx+UjQJVEo4SZC0gAvtvmOq3x48KIr3LwNJ5lzkwMKlh8HELBvzP4D\n261bZ6j0UXWWI5KN3bjL1JHBe8SjAF8+Or9OYorWMzvyIHh/zCzyKnp9G/lus1qz\n0Z8oBU5TjaRrjHCQAPBTwgcq0QMBQB8k64FXDl2Vn4ItpVyj0qmK5EJgCGfeAB0G\nfeER7c4GsoQ/x4dVvirKoQzzJWekF0G/tTPMdmEyqBqKoxHKE6pyHS6ZmtrXmrpV\nv24dI4TdzYsqbRlscLVjISW2AGoz875uHtJdAF9CJqqi2fnz3Onv3PzDIAJ1TWdv\nObJPzv5/AgMBAAECggEAD7Rr8k393kN8cK7gEhWanifUIPIJlc4zo73CpaYhYrZz\nkjSosVr8TNkaAls6pk7kc1FVDW4gL9kMaoYih9apCoiXFnEmCCwgCrbDyJgt5c0N\nXsc/ilIwiYEV5nIMEosA4b5fID2FEQ/8Ebij/4ax4NPrNshYdpjEwpJBnoa4Hb0G\nnWeCJf3HXMBs1HegslYWnKa6LexeCoYePXKgbEt5CHfSS5mEu9fsYp1qew6Ut7As\n2AxO7QaUpvkKpWRaleJhu2cH5WgvvvSZM2+SSF+3iNfH1l1flvJQJsdmm8Vtz4Tg\nCeEuZ0GAqxjFrVPCeshvuS/aWXpJdjh0j1hX21rzOQKBgQD9pDC2rruUh+nH4Zzs\nxO6cl94/BqeIDuRYqEhOD60f+i+WRHsSNC/JAUUHgKeljqWQ/gVTj+SS4EN0R391\njVsM/AuPchmYE2r0zzaH9RGs3bE2HoHr9J0AzM3kxQ9Ko2sLE3PcVHAghHOAPYJi\n/83amrXO8L2HlIKlmWDi4lkNxwKBgQDEzRWzIrzJRTPeYpxyZPOSmZNYpqJr/+Pu\nrgti/7xcFszaXiXcV8UgNu1wlP66F7qO3pW2UU1qDGBBK4tmARHGL69AgyOaQEDu\nuTPez8cpCeqWj6erc7WVQKyRwXvyV5ZsRF89sXbogXF2ABq1gWNNPDJhYlJuDMKS\nUP1YHIBpiQKBgAXGOyWtjK+w+G2IgV4Sjawa+QBOUnoSfLhX/G1qhfJ4a6TsIjEj\n5wKYeM3W6/ok6TgH0G86k2WUnXSEPC6c7Tm6czjszBBeQM0Z+o/V0HUzBtnIkASj\nKP/fqcBPjC2S0tkJtFWLxpG28jo1LEa8tB8J7qGrcWUoyGCkwUPpC0X5AoGBAJ6a\nrb9V4pHOzNOP44ep5kcisAZFHScu7jJAX/rkIZiR43ylXZvrvHmO6uLNoVC2qOpV\nZpCti1dJLBW5kzmc6QcxDOtQBNRerjX2WmBaUaa4UDARDE74DMKBgdJh/ZM8lYUh\nwSQGLs+I6rjvspbO9Qmc1vl29PmuHO0wikyFg9QJAoGAb92Qfwbows/8A7X+ZqKd\n2DlM8Rs0BZvx7fYdyvUb2eioFmIgnJoJwUgFQkL6qvpYf3TyBYyd1DRnzI/6qCd5\nZioqRLwKrQ+8GWcw5h1iAsLRi4jqgUBc3ZFrduAttt6n+QD7gr9xGbzrhiMzwhfz\nrVTtTUpp84JFGmZMXcAuD6M=\n-----END PRIVATE KEY-----\n","client_email": "${project.secrets.client_email}","client_id": "${project.secrets.client_id}","auth_uri": "${project.secrets.auth_uri}","token_uri": "${project.secrets.token_uri}","auth_provider_x509_cert_url": "${project.secrets.auth_provider_x509_cert_url}","client_x509_cert_url": "${project.secrets.client_x509_cert_url}"}' > file.json`,
      //         `echo '"${project.secrets.private_key}"' >file.json`,
      //         "ls -lart",
      //         "cat file.json",
      //         `sed -zE 's/\n/\\n/g' file.json>file2.json`,
      //         "ls -lart",
      //         "cat file2.json",
       "cat file.json",
      // "echo  $PRIVATE_KEY"
      //  `gcloud auth activate-service-account ${project.secrets.client_email} --key-file=file.json`,
      //  `gcloud config set project ${project.secrets.project_id}`,
      //  "curl -L https://dl.k8s.io/v1.10.6/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl",
      //  "chmod -R 775 /usr/local/bin/kubectl",
      //  `gcloud container clusters get-credentials ${project.secrets.project_name} --region us-central1-a`,
      //  "kubectl get pods"
    ]

    return buildcloud;
  }

  //Job to push new tags to gcr  
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
  //      docker login -u _json_key --password-stdin https://gcr.io < file.json
  //     "npm install",
  //     "npm start",


  //   ]

  //   return nodebuild;
  // }

  //   createTestJob(e, project) {
  //    TODO: If not "node", specify alternative docker container for your build
  //     var Test = new Job("test", "node:10.15.0-slim")
  //     Test.storage.enabled = true

  //     Test.tasks = [
  //     "cat /mnt/brigade/share/pipeline_app_version.txt"
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
