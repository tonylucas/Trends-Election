import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CandidatesPage } from '../candidates/candidates';
import { DiscoverPage } from '../discover/discover';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = CandidatesPage;
    tab2Root: any = HomePage;
    tab3Root: any = DiscoverPage;

    constructor() {

    }
}
