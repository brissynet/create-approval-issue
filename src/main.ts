import * as core from '@actions/core'
import * as github from '@actions/github'

async function runTask(): Promise<void> {
  try {
    const octokit = github.getOctokit(core.getInput('token'))
    const repository = core.getInput('repository')
    const [owner, repo] = repository.split('/')
    const title = core.getInput('title')
    const body = core.getInput('body')
    const labels = core.getInput('labels')
    const assignees = core.getInput('assignees')
    const run_number = core.getInput('run_number')

    const current = await octokit.rest.issues.listForRepo({
      owner: owner,
      repo: repo,
      labels: labels
    })

    if (current.data.length > 0) {
      // get the issue number
      const issue_number = current.data[0].number

      // set new labels for this issue
      await octokit.rest.issues.setLabels({
        owner: owner,
        repo: repo,
        issue_number: issue_number,
        labels: [
          "test123"
        ]
      })
    }

  } catch (error: any) {
    core.setFailed(error.message)
  }
}

runTask()
