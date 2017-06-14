import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/mergeMap';
import { Http, Headers, Response} from '@angular/http';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';


import { TrendsProvider } from '../../providers/trends';
import { MatchsProvider } from '../../providers/matchs';
import { Trend } from '../../models/trend';
import { Parent } from '../../models/parent';
import { Match } from '../../models/match';



@Component({
    selector: 'page-election',
    templateUrl: 'election.html'
})
export class ElectionPage implements OnInit {
    private title: string = "Élections";
    private type = "week";
    // public matchs: Match[];
    public matchs = [];

    constructor(
        public navCtrl: NavController,
        public trendsProvider: TrendsProvider,
        public matchsProvider: MatchsProvider,
        public http: Http) {

    }

    ngOnInit() {
        let obs = this.matchsProvider.getMatchs()
            .map(matchArray => matchArray.map((match, index) => {

                match.trends = [];

                // Get trends values for each match
                this.getTrendsFromParent(match._id)
                    .subscribe(trends => {
                        for (let trend of trends) {
                            // Line chart
                            let lineChartData: Array<any> = [];
                            let lineChartLabels: Array<any> = [];

                            // 1 data object per keyword
                            for (let i = 0; i < match.keywords.length; i++) {
                                lineChartData[i] = { data: [] };
                            }

                            let values = JSON.parse(trend.values);

                            for (let data of values.default.timelineData) {
                                let values = data.formattedValue;
                                for (let i = 0; i < values.length; i++) {
                                    lineChartData[i].data.push(values[i]);
                                }
                                // Push label (only day + month)
                                lineChartLabels.push(data.formattedTime.split(' 20')[0]);
                                // lineChartLabels.push(data.formattedTime);
                            }

                            trend.lineCharts = {
                                lineChartData: lineChartData,
                                lineChartLabels: lineChartLabels
                            };

                            // Bar chart

                            let averages = [];

                            for (let average of values.default.averages) {
                                averages.push({
                                    data: [average, average]
                                    // data: [30]
                                });
                            }
                            trend.barCharts = {
                                barChartData: averages
                            };

                            match.trends[trend.period] = trend;
                        }
                        this.matchs.push(match);

                    });
            }));

        obs.subscribe(res => {
            console.log("matchs > ", this.matchs);
            // console.log("this.lineChartLabels", this.lineChartLabels);
            // console.log(this.matchs[0].trends.values.default.timelineData);
            // console.log(res);
        });

    }

    // Get all current matchs
    getMatchs(): Observable<Match[]> {
        return this.matchsProvider.getMatchs();
    }

    // Get trend values for one keyword/match
    getTrendsFromParent(parentId): Observable<[Trend]> {
        return this.trendsProvider.getTrendsFromParent(parentId);
    }


    public showAverages: boolean = false;
    public lineChartLegend: boolean = false;
    public barChartLegend: boolean = false;
    public lineChartType: string = 'line';
    public barChartType: string = 'bar';

    public barChartLabels: string[] = ['Moyennes'];

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                categoryPercentage: 0.4,
                ticks: {
                    max: 100,
                    min: 0,
                    stepSize: 50
                },
                gridLines: {
                    display: false
                }
            }],
            xAxes: [{
                categoryPercentage: 0.5,
                gridLines: {
                    display: false
                }
            }]
        }
    };

    public lineChartOptions: any = {
        bar: {
            categoryPercentage: 0.2
        },
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 25,
                    fontColor: '#9e9e9e'
                },
                gridLines: {
                    display: true
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    max: 5,
                    min: 0,
                    stepSize: 25,
                    autoSkip: true,
                    autoSkipPadding: 100,
                    fontColor: '#9e9e9e',
                    fontSize: 10
                }
            }]
        },
        legend: {
            labels: {
                padding: '30'
            }
        },
        responsive: true,
        elements: {
            point: {
                radius: 0
            },
            line: {
                tension: 0.4,
                borderWidth: 2
            }
        }
    };
    public colors = [
        '#4285f4',
        '#db4437',
        '#f4b400',
        '#0f9d58',
        '#ab47bb'
    ];


    public barChartColors = [
        { backgroundColor: [ this.colors[0] ]},
        { backgroundColor: [ this.colors[1] ]},
        { backgroundColor: [ this.colors[2] ]},
        { backgroundColor: [ this.colors[3] ]},
        { backgroundColor: [ this.colors[4] ]}
    ];


    public lineChartColors: Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: this.colors[0],
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }, {
            backgroundColor: 'transparent',
            borderColor: this.colors[1],
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }, {
            backgroundColor: 'transparent',
            borderColor: this.colors[2],
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }, {
            backgroundColor: 'transparent',
            borderColor: this.colors[3],
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }, {
            backgroundColor: 'transparent',
            borderColor: this.colors[4],
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];



    // @ViewChild('lineChart') lineChart: BaseChartDirective;
    // @ViewChild('barChart') barChart: BaseChartDirective;
    //
    public animateChart(index):void {
    //     this.lineChart.ngOnChanges({});
    //     this.barChart.ngOnChanges({});
    }
}
