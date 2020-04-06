using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                var userData = File.ReadAllText("Data/UserSeedData.json");
                var users = JsonSerializer.Deserialize<List<User>>(userData);
                foreach (var user in users)
                {
                    byte[] passwordHash, salt;
                    CreatePasswordHash(out passwordHash, out salt, "password");
                    user.Password = passwordHash;
                    user.Salt = salt;
                    user.Username = user.Username.ToLower();
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }
        }
        private static void CreatePasswordHash(out byte[] passwordHash, out byte[] salt, string password)
        {
            using (var hash = new System.Security.Cryptography.HMACSHA512())
            {
                passwordHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                salt = hash.Key;
            }
        }
    }
}