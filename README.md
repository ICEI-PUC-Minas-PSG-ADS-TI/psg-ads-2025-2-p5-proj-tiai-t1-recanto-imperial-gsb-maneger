Recanto Imperial GSB Manager - API (dotnet 8)

Como usar:
1. Abra o diretório RecantoImperial.Api no Visual Studio ou VS Code.
2. Instale as ferramentas/SDK .NET 8.
3. No terminal do projeto, execute:
   dotnet restore
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   dotnet run

Banco SQLite será recanto.db na raiz do projeto.
