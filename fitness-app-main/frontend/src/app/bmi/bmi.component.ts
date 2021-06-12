//import { Component, OnInit } from '@angular/core';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent, Observable, merge, combineLatest } from 'rxjs';
import { map, startWith, share, tap } from 'rxjs/operators';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss']
})
export class BmiComponent implements AfterViewInit {

  //defining the elements of bmicomponent
  @ViewChild('heightSlider') heightSlider: ElementRef;
  @ViewChild('heightField') heightField: ElementRef;
  @ViewChild('weightSlider') weightSlider: ElementRef;
  @ViewChild('weightField') weightField: ElementRef;

  //Observables
  heightSliderChanges$: Observable<Event>;
  heightFieldChanges$: Observable<Event>;
  heightValue$: Observable<number>;

  weightSliderChanges$: Observable<Event>;
  weightFieldChanges$: Observable<Event>;
  weightValue$: Observable<number>;

  bmi$: Observable<number>;

  constructor() { }

  ngAfterViewInit() {
    //creating observable.fromEvent directly
    this.heightSliderChanges$ = fromEvent(this.heightSlider.nativeElement, 'input');
    this.heightFieldChanges$ = fromEvent(this.heightField.nativeElement, 'input');

    this.heightValue$ = merge(
      this.heightSliderChanges$,
      this.heightFieldChanges$,
    ).pipe(
      map(e => +(<HTMLInputElement>e.target).value),
      share(), // share has to come before startwith
      startWith(180),
    );

    this.weightSliderChanges$ = fromEvent(this.weightSlider.nativeElement, 'input');
    this.weightFieldChanges$ = fromEvent(this.weightField.nativeElement, 'input');

    this.weightValue$ = merge(
      this.weightSliderChanges$,
      this.weightFieldChanges$,
    ).pipe(
      map(e => +(<HTMLInputElement>e.target).value),
      share(),
      startWith(80),  //by default height is set to 80cm
    );

//the bmi keeps the updating the value accorhing to the height and weight change
    this.bmi$ = combineLatest(
      this.heightValue$,
      this.weightValue$,
    ).pipe(
      map(([h, w]) => this.computeBmi(h, w)),
    )
  }

  //computBmi() computes the bmi value with users height and weight
  private computeBmi(height: number, weight: number): number {
    const bmi = (weight / ((height / 100) * (height / 100)));
    return Number(bmi.toFixed(2));
  }
}


