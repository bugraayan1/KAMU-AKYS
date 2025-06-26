using System.Text.Json.Serialization;

namespace InovasyonFikirHavuzu.DTOs
{
    public class RegisterDto
    {
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }
        [JsonPropertyName("lastName")]
        public string LastName { get; set; }
        [JsonPropertyName("email")]
        public string Email { get; set; }
        [JsonPropertyName("password")]
        public string Password { get; set; }
        [JsonPropertyName("phoneNumber")]
        public string PhoneNumber { get; set; }
    }
} 