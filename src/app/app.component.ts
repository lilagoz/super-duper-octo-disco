import {Component, OnInit} from '@angular/core';
import {debounce, filter, interval, map, noop, Observable, Observer, tap, timer} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'Obama';

  i:number = 0;

  o$: Observable<any> = new Observable<number>((observer: Observer<number>)=> {
    for (this.i=0;this.i<1000;this.i++){
      observer.next(this.i);
    }
    setInterval(()=>{
      observer.next(this.i++)
    },100);
    //observer.complete();

    // unsubscribe function doesn't need to do anything in this
    // because values are delivered synchronously
     // return {unsubscribe() {}};
    })
      .pipe(
        debounce(() => timer(200)),
        filter(foo=>foo>900),
        filter(bar=>bar%2===0),
        tap(baz=>{
          console.log('tiptap', baz)
        }),
        map(quuz=>({ize:quuz, duplaIze:quuz * 2})),
        tap(baz=>{
          console.log('kopp kopp', baz);
        })
    )

  lajos:string = "Marika neni"

  ngOnInit(): void {
    this.o$.subscribe((value:any)=>{
      console.log('ez',value);
    })
  }
}
