using System;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            this._context = context;

        }
        public Task<User> Login(string username, string password)
        {
            throw new System.NotImplementedException();
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, salt;
            CreatePasswordHash(out passwordHash, out salt, password);
            user.Password = passwordHash;
            user.Salt = salt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(out byte[] passwordHash, out byte[] salt, string password)
        {
            using (var hash = new System.Security.Cryptography.HMACSHA512())
            {
                passwordHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                salt = hash.Key;
            }
        }

        public Task<User> UserExists(string username)
        {
            throw new System.NotImplementedException();
        }
    }
}