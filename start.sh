#!/bin/sh
echo "Starting PropertyService on port 5010..."
dotnet /app/property/RealEstate.PropertyService.dll --urls http://127.0.0.1:5010 &

echo "Starting InquiryService on port 5020..."
dotnet /app/inquiry/RealEstate.InquiryService.dll --urls http://127.0.0.1:5020 &

echo "Starting BlogService on port 5030..."
dotnet /app/blog/RealEstate.BlogService.dll --urls http://127.0.0.1:5030 &

# Wait 2 seconds for downstream microservices to be ready
sleep 2

# Render automatically sets $PORT, default to 5000 if not provided
GATEWAY_PORT=${PORT:-5000}
echo "Starting YARP API Gateway on public port ${GATEWAY_PORT}..."
exec dotnet /app/gateway/RealEstate.YarpGateway.dll --urls "http://0.0.0.0:${GATEWAY_PORT}"
