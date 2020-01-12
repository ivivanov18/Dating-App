using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string username, string password)
        {
            var userFromRepo = await _context.Users.FirstOrDefaultAsync(x => x.Username == username.ToLower());

            if (userFromRepo == null)
                return null;

            if (!VerifyPasswordHashEqual(password, userFromRepo.Password, userFromRepo.Salt))
                return null;

            return userFromRepo;
        }

        private bool VerifyPasswordHashEqual(string password, byte[] passwordHash, byte[] salt)
        {
            using (var hash = new System.Security.Cryptography.HMACSHA512(salt))
            {
                var computedPasswordHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedPasswordHash.Length; i++)
                {
                    if (computedPasswordHash[i] != passwordHash[i])
                        return false;
                }
                return true;
            }
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

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.Username.Equals(username)))
                return true;
            return false;
        }
    }
}