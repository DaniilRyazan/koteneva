# Используем официальный .NET Core базовый образ
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080

# Используем официальный .NET SDK для сборки
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["backend/TourCatalogAPI/TourCatalogAPI.csproj", "backend/TourCatalogAPI/"]
RUN dotnet restore "backend/TourCatalogAPI/TourCatalogAPI.csproj"
COPY . .
WORKDIR "/src/backend/TourCatalogAPI"
RUN dotnet build "TourCatalogAPI.csproj" -c Release -o /app/build

# Публикуем приложение
FROM build AS publish
RUN dotnet publish "TourCatalogAPI.csproj" -c Release -o /app/publish

# Запускаем приложение
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TourCatalogAPI.dll"]