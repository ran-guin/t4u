designed to run on adonis backend with Vue front end....

Testing can be done independently on vue using the vue client:



*** 
adonis setup (assuming adonis client is installed):

adonis new <pname> --slim (include --slim if using for api only.  Exclude if using adonis views as well)

***
Vue setup (assuming view client is installed):

vue new

***
amalgamation:

* yarn build (build dist/ files in vue component using 'yarn build')
* cp -R dist/* ../<pname>/public/
* mv ../<pname>/public/index.html ../<pname>/public/mainVue.html
* cp -R src/components/<project>/setup/adonis/* ../<pname>/ (copy applicable adonis files over.. including at least new start/routes.js file)
(to include multiple projects, rename routes.js file to <pname>Routes.js for each project and include the following line:

use require('./<pname>Routes')


system should now run on core adonis core
(where route in start/route.js runs mainVue.html)


