# Description

The project is structured seperately frontend and backend.

# Frontend project

The frontend project uses the following technologies:

HTML5, CSS, javascript and showcases features including grid and flex layout, web components, service workers, cache storage, local storage, native installer, templates, ES6, routing, custom events.

Additional libraries and tooling are used including rollup.js, d3js, lit-html, cypress.js, browser sync.

The project builds to around 2mb distributable.  d3js and lit-html account for 99% of the total size. 
	
# Recommended software for local development

- npm 

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
2. Launch browser sync using the provided script (bsync-watch-files.sh).  The script was tested to run on Windows 10. It may be necessary to edit the name of the browser for different OS, eg. "chrome" -> "Google Chrome"
3. Edit src files and see the result instantly in the browser at http://localhost:3000/

# To deploy to the cloud

1. Run rollup script (buildRollup.sh)
2. To verify generated dist files.  Kill browser sync if running.  
3. Start browser sync in web server mode using the script (bsync-serve-static.sh) and browse at http://localhost:3000/