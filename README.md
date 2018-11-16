# Description

The project is structured into frontend and backend.

# Frontend project

The frontend project uses the following technologies:

HTML5, CSS, javascript and showcases features including grid and flex layout, web components, service workers, cache storage, local storage, native installer, templates, ES6, routing, custom events.

Additional libraries and tooling are used including rollup.js, d3js, lit-html, cypress.js, browser sync.

The project builds to around 2mb distributable.  d3js and lit-html account for 99% of the total size. 
	
# Recommended software for local development

- npm.  JavaScript package manager

	https://www.npmjs.com
	
- browser sync.  Time-saving synchronised browser testing

	npm install -g browser-sync
	
- Visual Studio Code.  Code editor 

	https://code.visualstudio.com/

- cypress.js.  Integration testing tool

	npm install cypress
	
- git.  Source Code Management

	https://git-scm.com/
	
# Required software for automated deployment to aws

- rollup.js
	
	npm install --global rollup
	
- AWS Command Line Interface
	
	https://aws.amazon.com/cli/

# Local development guide

1. Optional step.  Create a git branch.  git checkout -b my-junk-branch
2. Start Visual Studio Code and open the frontend directory.
2. Launch browser sync using the script (bsync-watch.sh).  The script was tested on Windows 10. Edit browser name if error, eg. "chrome" -> "Google Chrome"
3. Edit src files
4. Results instantly in the browser at http://localhost:3000/

# Manual testing packaged modules

1. Execute rollup script (buildRollup.sh)
2. Kill browser sync if running.  
3. Launch browser sync in web server mode using the script (bsync-serve.sh)
4. Browse at http://localhost:3000/

# To deploy to the cloud

1. Upload the project to amazon S3 with the script (awsUpload.bat)
2. Browse at http://magicmarkets.s3-website-eu-west-1.amazonaws.com

# Secrets

Credentials are needed for:

- Pushing changes to this repo in github
- Uploading files to S3.  AWS cli on windows uses a credentials file at (%UserProfile%\.aws)  See: https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html

# Native OS install

1. chrome://flags/
2. Type search term: "banner"
3. Enable all drop downs
4. Relaunch the browser
5. Browse at http://localhost:3000/
6. Open chrome menu dropdown -> "Install magicmarkets"
7. New icon on the desktop
