﻿using AppTest.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AppTest.Server.Repositories
{
    public class BookService : IBookServices
    {
        private readonly BookContext _context;

        //Implement Bussiness Rule / USE CASES
        public BookService(BookContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetBooksAsync()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book> GetBookByIdAsync(int id)
        {
            return await _context.Books.FindAsync(id);
        }

        public async Task AddBookAsync(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBookAsync(int id, Book book)
        {
            var existingBook = await _context.Books.FindAsync(id);

            if (existingBook == null)
                throw new KeyNotFoundException($"Book with ID {book.Id} not found.");

            existingBook.Author = book.Author;
            existingBook.Title = book.Title;    
            existingBook.Description = book.Description;
            existingBook.Price = book.Price;

            _context.Entry(existingBook).CurrentValues.SetValues(existingBook);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book != null)
            {
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"Book with ID {id} not found.");
            }
        }
    }
}
