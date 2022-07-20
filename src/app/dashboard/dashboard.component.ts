import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../utills/api';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';


// export class DashboardComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
    

//   }

// }



interface FoodNode {
  name: string;
  children?: FoodNode[];
}






const TREE_DATA: FoodNode[] = [
  {
    name: 'Phases',
    children: [{name: 'Display'}, {name: 'Discover'}, {name: 'Explore'}, {name: 'Prepare'}, {name: 'Prepare soft Launch '}, {name: 'Blank'}],
  },
  {
    name: 'Workstreem',
    children: [{name: 'Architecture'}, {name: 'Change Management & Training'}, {name: 'MDM'}, {name: 'Project Management'}, {name: 'Security & Authorization'}, {name: 'Solution Design & Build'}, {name: 'Testing'}],
  },
  {
    name: 'Product',
    children: [{name: 'SAP S/4HANA Cloud'}],
  },
  
  {
    name: 'More',
    
    
    children: [{name: 'System Conversion'},{name: 'New Implementation'},{name: 'Selective Data Transition'}],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

 

  

  ngOnInit() {
    if(!localStorage.getItem('authtoken')) {
      this.router.navigate(['/']);
    }

    this.getExcelData();
  }

  getExcelData() {
    this._api.getTypeRequest('excel/records?id=1').subscribe((res: any) => {
      // this.dataSource = res;
    
      // let u = [];
      // for(let user of res) {
      //   u.push({
      //     value: user.id, viewValue: user.full_name
      //   })
      // }
      console.log(res);
    
      // this.userData = u;

    });
  }

  name = 'Angular';
  myArray: any[] = [
    {
      "size": "2GB",
      "value":false
    },
    {
      "size": "4GB",
      "value":false
    },
    {
      "size": "8GB",
      "value":false
    }
  ];

  changeHandler(){
    console.log(this.myArray);
  }
  
  panelOpenState = false;

  isShown: boolean = false ; // hidden by default


toggleShow() {

this.isShown = ! this.isShown;


}

  title = 'TRV';
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private _api: ApiService,
    private router: Router) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onClickLogout() {
    console.log("assd");
    localStorage.removeItem('userData');
    localStorage.removeItem('authtoken');
    localStorage.removeItem('usertype');
    this.router.navigate(['/']);
  }

}



