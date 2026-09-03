# Build context is backend/ so NuGet.config is in scope.
FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /src

COPY NuGet.config .
COPY Froog.SandboxService/Froog.SandboxService.csproj Froog.SandboxService/
RUN dotnet restore Froog.SandboxService/Froog.SandboxService.csproj

COPY Froog.SandboxService/ Froog.SandboxService/
RUN dotnet publish Froog.SandboxService/Froog.SandboxService.csproj -c Release -o /app --no-restore


FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app
COPY --from=build /app .
USER $APP_UID
EXPOSE 8080
ENTRYPOINT ["dotnet", "Froog.SandboxService.dll"]
