@echo off
CD C:\mongodb\bin
dir
mongo localhost:27017/mapamun_Dengue2  \script.js
pause