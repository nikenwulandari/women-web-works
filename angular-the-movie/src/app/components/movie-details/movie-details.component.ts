import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ACCESS_TOKEN } from '../../constants/movie.constant';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movieId!: number;
  movieDetails: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.movieId = +params.get('id');
      this.fetchMovieDetails();
    });
  }

  fetchMovieDetails() {
    const accessTokenAuth = ACCESS_TOKEN;
    const apiUrl = `https://api.themoviedb.org/3/movie/${this.movieId}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessTokenAuth}`,
      Accept: 'application/json',
    });

    this.http.get<any>(apiUrl, { headers: headers }).subscribe(
      (data) => {
        this.movieDetails = data;
      },
      (error) => {
        console.log('Error fetching movie details:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/movies']);
  }
}
