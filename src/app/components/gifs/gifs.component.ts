import { Component } from '@angular/core';
import { Counter } from 'src/app/interfaces/counter';
import { GifService } from 'src/app/services/gifservice.service';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.scss']
})

export class GifsComponent {

  public listOfGifs: any = [];

  public searchParams: string = "";

  public counter: Counter = { total_count: 0, count: 0 };

  constructor(
    public gifService: GifService
  ) { }

  ngOnInit(): void {

  }

  searchParamsChanges(): void {

    if (this.searchParams?.length === 0) {
      alert('No puedes enviar parámetros vacíos');
      return;
    }

    this.gifService.searchByString(this.searchParams)
      .subscribe((res) => {
        console.log(res);
        this.listOfGifs = Number(res?.gifs.length) > 0 ? res?.gifs : [];
        this.counter = res.counter;
      });
  }

}
