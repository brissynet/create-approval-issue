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

    const res = await octokit.rest.issues.listForRepo({
      owner: owner,
      repo: repo
    })

    console.log(res.data.toString)

  } catch (error: any) {
    core.setFailed(error.message)
  }
}

runTask()
