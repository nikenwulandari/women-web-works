import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { RouterModule } from '@angular/router';
import { ACCESS_TOKEN } from '../../constants/movie.constant';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MovieCardComponent, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  providers: [HttpClient],
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const accessTokenAuth = ACCESS_TOKEN;
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessTokenAuth}`,
      Accept: 'application/json',
    });

    this.http.get<any>(apiUrl, { headers: headers }).subscribe(
      (data) => {
        this.movies = data.results;
      },
      (error) => {
        console.log('Error fetching movies:', error);
      }
    );
  }
}
