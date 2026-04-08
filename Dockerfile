# Используем базовые образы для .NET 10.0
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8081  # Открываем порт 8081

# Далее идет сборка и публикация
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["backend/TourCatalogAPI/TourCatalogAPI.csproj", "backend/TourCatalogAPI/"]
RUN dotnet restore "backend/TourCatalogAPI/TourCatalogAPI.csproj"
COPY . . 
WORKDIR "/src/backend/TourCatalogAPI"
RUN dotnet build "TourCatalogAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TourCatalogAPI.csproj" -c Release -o /app/publish

# Финальный контейнер
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TourCatalogAPI.dll"]