namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int ItemsPerPage { get; set; }
        public int CurrentPage { get; set; }

        public PaginationHeader(int totalItems, int totalPages, int itemsPerPage, int currentPage)
        {
            TotalItems = totalItems;
            TotalPages = totalPages;
            ItemsPerPage = itemsPerPage;
            CurrentPage = currentPage;
        }
    }
}