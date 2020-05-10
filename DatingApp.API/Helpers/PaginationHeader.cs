namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int ItemsPerPages { get; set; }
        public int CurrentPage { get; set; }

        public PaginationHeader(int totalItems, int totalPages, int itemsPerPages, int currentPage)
        {
            TotalItems = totalItems;
            TotalPages = totalPages;
            ItemsPerPages = itemsPerPages;
            CurrentPage = currentPage;
        }
    }
}