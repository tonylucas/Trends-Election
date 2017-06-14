import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CandidatesPage } from '../pages/candidates/candidates';
import { DiscoverPage } from '../pages/discover/discover';
import { ElectionPage } from '../pages/election/election';
import { TabsPage } from '../pages/tabs/tabs';
import { TrendsProvider } from '../providers/trends';
import { MatchsProvider } from '../providers/matchs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import { ChartsComponent } from '../components/charts/charts';


@NgModule({
    declarations: [
        MyApp,
        CandidatesPage,
        DiscoverPage,
        ElectionPage,
        TabsPage,
    ChartsComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
        ChartsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        CandidatesPage,
        DiscoverPage,
        ElectionPage,
        TabsPage
    ],
    providers: [
        TrendsProvider,
        MatchsProvider,
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
