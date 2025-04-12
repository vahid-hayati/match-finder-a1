var builder = WebApplication.CreateBuilder(args);

#region MongoDbSettings
///// get values from this file: appsettings.Development.json /////
// get section
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection(nameof(MongoDbSettings)));

// get values
builder.Services.AddSingleton<IMongoDbSettings>(serviceProvider =>
    serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value);


// get connectionString to the db
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    MongoDbSettings uri = serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;


    return new MongoClient(uri.ConnectionString);
});
#endregion MongoDbSettings

builder.Services.AddScoped<IAccountRepository, AccountRepository>();

#region Cors: baraye ta'eede Angular HttpClient requests
builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
            policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
    });
#endregion Cors

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();



// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi();
// }

// app.UseHttpsRedirection();

// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast =  Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();
//     return forecast;
// })
// .WithName("GetWeatherForecast");

// app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }
