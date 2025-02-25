const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  try {
    process.env.IOS_APP_ID = core.getInput("app-id");
    if (
      core.getInput("browserstack-upload").toLowerCase() === "true" &&
      (!core.getInput("browserstack-username") ||
        !core.getInput("browserstack-access-key"))
    ) {
      throw new Error("Browserstack username or access key missing.");
    }
    process.env.INCREMENT_BUILD_NUMBER = core.getInput("increment-build-number");
    process.env.TESTFLIGHT_UPLOAD = core.getInput("upload-to-testflight");
    process.env.PROJECT_PATH = core.getInput("project-path");
    process.env.TEAM_ID = core.getInput("team-id");
    process.env.TEAM_NAME = core.getInput("team-name");
    process.env.WORKSPACE_PATH = core.getInput("workspace-path");
    process.env.EXPORT_METHOD = core.getInput("export-method");
    process.env.CONFIGURATION = core.getInput("configuration");
    process.env.OUTPUT_PATH = core.getInput("output-path");
    process.env.SCHEME = core.getInput("scheme");
    process.env.BROWSERSTACK_UPLOAD = core.getInput("browserstack-upload");
    process.env.BROWSERSTACK_USERNAME = core.getInput("browserstack-username");
    process.env.BROWSERSTACK_ACCESS_KEY = core.getInput(
      "browserstack-access-key"
    );
    process.env.BUILD_PODS = core.getInput("build-pods");
    process.env.PODS_PATH = core.getInput("pods-path");

    process.env.MATCH_PASSWORD = core.getInput("match-password");
    const matchS3Bucket = core.getInput("match-s3-bucket");
    if (!!matchS3Bucket) {
      process.env.MATCH_S3_BUCKET = matchS3Bucket;
    }
    const matchGitUrl = core.getInput("match-git-url");
    if (!!matchGitUrl) {
      process.env.MATCH_GIT_URL = matchGitUrl;
    }
    const matchGitAuth = core.getInput("match-git-basic-authorization");
    if (!!matchGitAuth) {
      process.env.MATCH_GIT_BASIC_AUTHORIZATION = matchGitAuth;
    }
    process.env.MATCH_BUILD_TYPE = core.getInput("match-build-type");

    process.env.APPLE_KEY_ID = core.getInput("apple-key-id");
    process.env.APPLE_KEY_ISSUER_ID = core.getInput("apple-key-issuer-id");
    process.env.APPLE_KEY_CONTENT = core.getInput("apple-key-content");
    process.env.INCLUDE_BITCODE = core.getInput("include-bitcode")
    await exec.exec(`bash ${__dirname}/../build.sh`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
