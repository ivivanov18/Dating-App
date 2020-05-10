namespace DatingApp.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;

        private int pageSize = 10;

        private int PageSize;
        public int MyProperty
        {
            get { return pageSize; }
            set { PageSize = value <= MaxPageSize ? value : MaxPageSize; }
        }

    }
}