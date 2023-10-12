import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Gifs } from '../interfaces/gifs';
import { Counter } from '../interfaces/counter';

@Injectable({
  providedIn: 'root'
})

export class GifService {

  constructor(
    public http: HttpClient
  ) { }

  searchByString(params: string): Observable<any> {
    return this.http.get<any>(`https://api.giphy.com/v1/gifs/search?api_key=qBrsJ9y3r3HELO12pKPWa3Gj1NzczF5h&q=${params}`)
      .pipe(
        map((response: any) => {

          if (Number(response?.data?.length) > 0) {

            const responseItems: any = response;

            let gifs: Gifs[] = [];
            let counter: Counter;

            responseItems.data.map((items: any) => {
              gifs.push({ url: items.images?.original?.url, title: items.title })
            });

            counter = { count: responseItems.pagination.count, total_count: responseItems.pagination.total_count };

            return { gifs, counter };

          }

          alert('No hay gifs asociados con los parámetros ingresados');
          return []; // Retorne un arreglo vacío si no hay nada

        })
      )
  }

}
