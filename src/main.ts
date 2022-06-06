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
      state: 'open',
      labels: labels
    })

    const new_labels: string[] = labels.split(',')
    new_labels.push("run:" + run_number)

    if (current.data.length == 0) {
      // create a new issue
      await octokit.rest.issues.create({
        owner: owner,
        repo: repo,
        title: title,
        body: body,
        assignees: assignees.split(','),
        labels: new_labels
      })
    }
    else if (current.data.length > 0) {
      // get the current issue number
      var issue_number = current.data[0].number

      await octokit.rest.issues.update({
        owner: owner,
        repo: repo,
        issue_number: issue_number,
        labels: new_labels,
        body: body
      });
    }
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

runTask()
