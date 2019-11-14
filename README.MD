
# React native FS boilerplate

Instructions for renaming a React Native project

 1. Open `app.json` file inside root react native folder and change `name` and `displayName` to **NewName**

## iOS

1. Remove the `.git` folder from your project root folder
2. Open terminal and move to the `iOS` folder inside your react native project
3. Install **ack rename** with `brew install rename ack`
4. Run `find . -name 'ReactBoiler*' -print0 | xargs -0 rename --subst-all 'ReactBoiler' 'NewName'` (you have to run it 2X because the first time it renames all the folders and the second time it renames all the files)
5. Check if all folders/files were renamed properly by running `find . -name 'ReactBoiler*'` (If everything was successful you should get an empty output)
6. Now replace all occurrences of oldName in files with `ack --literal --files-with-matches 'ReactBoiler' --print0 | xargs -0 sed -i '' 's/ReactBoiler/NewName/g'`
7. Check with `ack --literal 'ReactBoiler'` and if the output is empty you good to move forward
8. Run `npm install`
9. Run `pod install`
10. Move the **.git** folder back to project root folder
11. Open Xcode and under `general` settings change the identity values according to your **NewName** and set the preferred `Bundle Identifier` value
12. Pray to god

## Android  

 1. install `react-native-rename` with `npm install react-native-rename --save`
 2. Run `react-native-rename "NewName" -b YOURBUNDLENAME`
 3. If sucess run `watchman watch-del-all`
 4. Open `MainActivity.java` and change the `getMainComponentName` function to return your **NewName**
 5. Open `settings.gradle` and change the `rootProject.name` value to **NewName**
 6. Double check the structure of `android` folder so that the bundle name is correct.
 7. Pray to god once more

###Android throubleshooting

In case of build fails regarding .DEBUG not forund in mainapplication or cannot find mainactivity errors please check the following params:

1. package (usually line 2) in `/android/app/src/main/AndroidManifest.xml`
2. applicationId (usually line 90) in `defaultConfig section of /android/app/build.gradle`
3. Line 1 of `/android/app/src/main/java/com/paysack/MainApplication.java`
4. Line 1 of `/android/app/src/main/java/com/paysack/MainActivity.java`