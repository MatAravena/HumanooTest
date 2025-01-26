using Microsoft.EntityFrameworkCore;

namespace AppTest.Server.Models
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Default values
            modelBuilder.Entity<Book>().HasData(
                new Book { Id = 1, Title = "Book of life", Author = "Matias Aravena", Description = "Describing how to survive in Germany under economic depression.", Price = 29.99M },
                new Book { Id = 2, Title = "Understanding how to get employed", Author = "Tomas Aravena", Description = "How to find a job in a new field without having much experience.", Price = 39.99M },
                new Book { Id = 3, Title = "Magic for not believers", Author = "Sandra Edwards", Description = "How to make scientific people in the ghost and spirit realm.", Price = 24.99M }
            );
        }
    }
}
