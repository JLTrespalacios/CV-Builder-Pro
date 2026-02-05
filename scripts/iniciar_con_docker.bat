@echo off
cd /d "%~dp0..\app"
echo ==========================================
echo    INICIANDO CON DOCKER (NODE.JS)
echo ==========================================
echo.
echo Comprobando Docker...
docker --version >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Docker no se encuentra.
    echo Asegurate de tener Docker Desktop instalado y ejecutandose.
    echo Descargalo en: https://www.docker.com/products/docker-desktop/
    echo.
    pause
    exit
)

echo.
echo 1. Descargando imagen de Node.js (esto puede tardar la primera vez)...
call docker pull node:24-alpine

echo.
echo 2. Iniciando contenedor e instalando dependencias...
echo La aplicacion estara disponible en: http://localhost:5173
echo (Presiona Ctrl+C para detener el servidor)
echo.

:: Ejecutamos el contenedor
:: -p 5173:5173 : Mapeamos el puerto
:: -v "%cd%":/app : Montamos la carpeta actual en /app dentro del contenedor
:: -w /app : Establecemos el directorio de trabajo
:: sh -c "..." : Comandos a ejecutar dentro del contenedor
docker run -it --rm -p 5173:5173 -v "%cd%":/app -w /app node:24-alpine sh -c "npm install && npm run dev -- --host"

pause