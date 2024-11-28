import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from './services/book.service';
import { catchError, map } from 'rxjs';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Book Manager';

  constructor(private http: HttpClient, private bookService: BookService) {
    console.log('App initialized');
    this.bookService.getBooks().subscribe(
      books => console.log('Books:', books),
      error => console.error('Error:', error)
    );
  }

  ngOnInit() {}
}
