@echo off
title Discord Bot and XAMPP Launcher

@REM Start XAMPP
start "XAMPP Control Panel" "C:\xampp\xampp-control.exe" 

@REM Wait for XAMPP services to start (adjust the sleep time as needed)
timeout /t 10


@REM Change the directory to where your Discord bot script is located
cd "D:\Github\Bots\Discord.js\discord.js-dashboard\bot"

REM Start your Discord bot using nodemon (or node . if you don't use nodemon/have it installed)
nodemon

@REM Keep the batch file open so you can see any console output
pause
