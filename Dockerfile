# Указываем базовый образ для .NET 10
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 8080

# Указываем образ для сборки для .NET 10
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["TourCatalogAPI/TourCatalogAPI.csproj", "TourCatalogAPI/"]
RUN dotnet restore "TourCatalogAPI/TourCatalogAPI.csproj"
COPY . .
WORKDIR "/src/TourCatalogAPI"
RUN dotnet build "TourCatalogAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TourCatalogAPI.csproj" -c Release -o /app/publish

# Указываем финальный контейнер для работы
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TourCatalogAPI.dll"]