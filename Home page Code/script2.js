{
    "createTime": 1709439418034,
    "updateTime": 1709439418040,
    "name": "autoemail",
    "description": "Automatic_email",
    "version": 1,
    "tasks": [
      {
        "name": "redirect",
        "taskReferenceName": "redirect_ref",
        "inputParameters": {
          "uri": "www.greenpratidin.club",
          "method": "GET",
          "connectionTimeOut": 3000,
          "readTimeOut": "3000",
          "accept": "application/json",
          "contentType": "application/json",
          "body": {
            "Join": "${workflow.input}"
          }
        },
        "type": "HTTP",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "optional": false,
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {}
      },
      {
        "name": "GET_DOCUMENT",
        "taskReferenceName": "GET_DOCUMENT_2cf_ref",
        "inputParameters": {
          "Sendmail": "${workflow.output}"
        },
        "type": "SIMPLE",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "optional": false,
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {}
      }
    ],
    "inputParameters": [
      ""
    ],
    "outputParameters": {},
    "failureWorkflow": "",
    "schemaVersion": 2,
    "restartable": true,
    "workflowStatusListenerEnabled": false,
    "ownerEmail": "devxaves@gmail.com",
    "timeoutPolicy": "ALERT_ONLY",
    "timeoutSeconds": 0,
    "variables": {},
    "inputTemplate": {}
  }