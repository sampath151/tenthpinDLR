import { Component } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';




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
  // {
  //   name: 'Vegetables',
  //   children: [
  //     {
  //       name: 'Green',
  //       children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
  //     },
  //     {
  //       name: 'Orange',
  //       children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
  //     },
  //   ],
  // },
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

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

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

