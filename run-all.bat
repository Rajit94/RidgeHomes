@echo off
echo ========================================================
echo   Starting Real Estate Microservices Platform
echo   (Ridge Homes Clone - Shiwansh Solution Intern Project)
echo ========================================================
echo.

echo [1/5] Starting PropertyService on port 5010...
start "PropertyService :5010" cmd /k "cd src\Services\PropertyService && dotnet run --urls http://localhost:5010"

echo [2/5] Starting InquiryService on port 5020...
start "InquiryService :5020" cmd /k "cd src\Services\InquiryService && dotnet run --urls http://localhost:5020"

echo [3/5] Starting BlogService on port 5030...
start "BlogService :5030" cmd /k "cd src\Services\BlogService && dotnet run --urls http://localhost:5030"

echo Waiting 4 seconds for services to initialize...
timeout /t 4 > nul

echo [4/5] Starting YARP API Gateway on port 5000...
start "YarpGateway :5000" cmd /k "cd src\ApiGateway\RealEstate.YarpGateway && dotnet run --urls http://localhost:5000"

echo [5/5] Starting React Frontend Client on port 5173...
start "React ClientApp :5173" cmd /k "cd src\ClientApp && npm run dev"

echo.
echo ========================================================
echo   All microservices and gateway launched!
echo   Frontend URL:   http://localhost:5173
echo   YARP Gateway:   http://localhost:5000
echo   Admin Leads:    http://localhost:5173/admin
echo ========================================================
