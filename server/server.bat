@echo off
title Fastify Server Starter

@REM Change the directory to where your server file is located
cd D:\Github\Bots\Discord.js\discord.js-dashboard\server

@REM wait a few seconds for the server to start
timeout /t 10

@REM Start your fastify server
nodemon server.js

@REM Pause the script so you can see any errors
pause