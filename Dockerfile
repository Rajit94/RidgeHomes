# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy solution and project files
COPY *.sln* ./
COPY src/ApiGateway/RealEstate.YarpGateway/*.csproj src/ApiGateway/RealEstate.YarpGateway/
COPY src/Services/PropertyService/*.csproj src/Services/PropertyService/
COPY src/Services/InquiryService/*.csproj src/Services/InquiryService/
COPY src/Services/BlogService/*.csproj src/Services/BlogService/

# Restore dependencies
RUN dotnet restore

# Copy all source code
COPY src/ src/

# Publish each microservice and gateway
RUN dotnet publish src/Services/PropertyService/RealEstate.PropertyService.csproj -c Release -o /app/out/property
RUN dotnet publish src/Services/InquiryService/RealEstate.InquiryService.csproj -c Release -o /app/out/inquiry
RUN dotnet publish src/Services/BlogService/RealEstate.BlogService.csproj -c Release -o /app/out/blog
RUN dotnet publish src/ApiGateway/RealEstate.YarpGateway/RealEstate.YarpGateway.csproj -c Release -o /app/out/gateway

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build /app/out /app/
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 5000

ENTRYPOINT ["/app/start.sh"]
