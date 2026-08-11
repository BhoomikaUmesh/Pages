connecting a local folder to github repository and creating a github page

- make changes in folder
- git init
- git config user.name "gh username"
- git config user.email "gh email"
- git config --local user.name
- git config --local user.email
- git branch -m main
- git add .
- git commit -m "commit message"
- git remote add origin linkToRepo.git (https://github.com/BhoomikaUmesh/Repo.git)
- git remote -v
- git push -u origin main (--force)

- npm install gh-pages --save-dev
- npm run build
- npm run deploy

- open repository in github
- open settings
- goto pages
- select the gh-pages branch and save
- visit the page

- pushing and deploying new changes:
- git add .
- git commit -m "message"
- git push
- npm run deploy

