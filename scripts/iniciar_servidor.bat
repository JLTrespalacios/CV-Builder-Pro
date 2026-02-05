@echo off
cd /d "%~dp0..\app"
echo ==========================================
echo    INICIANDO GENERADOR DE CV WEB
echo ==========================================
echo.
echo Verificando instalacion de Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado o no se encuentra en el sistema.
    echo Por favor, instala Node.js desde: https://nodejs.org/
    echo despues de instalarlo, cierra y vuelve a abrir este archivo.
    echo.
    pause
    exit
)

echo Instalando dependencias (si faltan)...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Hubo un problema instalando las dependencias.
    pause
    exit
)

echo.
echo Iniciando servidor...
echo Cuando veas "Local: http://localhost:5173", abre esa direccion en tu navegador.
echo.
call npm run dev
pause