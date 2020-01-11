using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthRepository _repo;
        public AuthController(AuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Register(string username, string password)
        {
            // TODO: validate input

            if (await _repo.UserExists(username))
                return BadRequest("Username already exists");

            User userToCreate = new User
            {
                Username = username,
            };

            var createdUser = await _repo.Register(userToCreate, password);

            return StatusCode(201);
        }


    }
}