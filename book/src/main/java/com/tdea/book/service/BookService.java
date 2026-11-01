package com.tdea.book.service;

import com.tdea.book.entity.Book;
import com.tdea.book.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Book findById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    public Book save(Book book) {
        return bookRepository.save(book);
    }

    public Book update(Long id, Book book) {
        Book existingBook = findById(id);
        existingBook.setName(book.getName());
        existingBook.setIsbnNumber(book.getIsbnNumber());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setPublishDate(book.getPublishDate());
        existingBook.setPrice(book.getPrice());
        existingBook.setType(book.getType());
        return bookRepository.save(existingBook);
    }

    public void delete(Long id) {
        Book book = findById(id);
        bookRepository.delete(book);
    }

    public static class BookNotFoundException extends RuntimeException {

        public BookNotFoundException(Long id) {
            super("Book not found with id: " + id);
        }
    }
}
