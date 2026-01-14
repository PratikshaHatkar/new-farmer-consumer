
start commads:::
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/PratikshaHatkar/new-farmer-consumer.git
git push -u origin main


Every day when working on the project:

git pull origin main → sync remote first
Make changes in VS Code
git add .
git commit -m "..."
git pull --rebase origin main → optional but safe
git push origin main

JWT authentication is done
farmer dashboard basic frontend done
logged in user name should display  -- done

Profile::
update the userModel means schema add phone , address , farmname
create getMyProfile controller function
create updateMyProfile controller function
routes are created 
now i am making the frontend part add jsx file and routes and data display


Farmer dashboard 
add produce api check

31 dec:
product controller: add , count ,list , update , delete

1 jan:

Multer is a middleware for Express that handles file uploads.
now the add product form is work and images are store at the uploads folder 

4 jan
solves the error at product form

5
solves the error of product form 
displays count , validation done , add product done , delete product is done

6 jan :
edit functionlity , search functionality


7 , 9 jan:
edit functionality error solve
product can be updated the data is fetch in the form use singleproductdata controller and updateData controller and write frontend also