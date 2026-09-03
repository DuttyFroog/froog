# Build context is backend/ so NuGet.config is in scope.
FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /src

COPY NuGet.config .
COPY Froog.AuthService/Froog.AuthService.csproj Froog.AuthService/
RUN dotnet restore Froog.AuthService/Froog.AuthService.csproj

COPY Froog.AuthService/ Froog.AuthService/
RUN dotnet publish Froog.AuthService/Froog.AuthService.csproj -c Release -o /app --no-restore


FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app
COPY --from=build /app .
USER $APP_UID
EXPOSE 8080
ENTRYPOINT ["dotnet", "Froog.AuthService.dll"]
