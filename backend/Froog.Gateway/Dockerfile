# Build context is backend/ so NuGet.config is in scope.
FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /src

COPY NuGet.config .
COPY Froog.Gateway/Froog.Gateway.csproj Froog.Gateway/
RUN dotnet restore Froog.Gateway/Froog.Gateway.csproj

COPY Froog.Gateway/ Froog.Gateway/
RUN dotnet publish Froog.Gateway/Froog.Gateway.csproj -c Release -o /app --no-restore


FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app
COPY --from=build /app .
USER $APP_UID
EXPOSE 8080
ENTRYPOINT ["dotnet", "Froog.Gateway.dll"]
