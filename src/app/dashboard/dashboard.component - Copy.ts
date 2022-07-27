import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../utills/api';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}


const TREE_DATA: any = [];

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

      this._api.getTypeRequest('excel/headerscontent').subscribe((resu: any) => {    
      
        let i = 0;
        let x : FoodNode[]= [];
        for(let re of resu) {
          
          if(i !== 0  && x[i-1].name.indexOf(re.headername) !== -1) {
            x[i-1].children?.push({
              name: re.headersubname
            })
          } else {
            x.push({
              name: re.headername,
              children: []
            })
            x[i].children?.push({
              name: re.headersubname
            })
            
            i++;  
          }
        }
        
        
        
        this.dataSource.data = x;
      });
      this.excelresult = res;
      this.exceldataSource = this.processExcelData(res);
      // this.exceldataSource = res;
      console.log( this.exceldataSource);
    });
  }

  processExcelData(result: any) {
    let i = 0;
    let finalres: any[] = [];
    for(let re of result) {
      if(i !== 0  && finalres[i-1].name.indexOf(re.phase) !== -1) {
        finalres[i-1].children?.push({
          desription: re.description,
          descriptiondetails: re.descriptiondetails,
          istemplateordeployment: re.istemplateordeployment,
          activedeliverales: re.activedeliverales,
          responsibleteam: re.responsibleteam
        })
      } else {
        if(re.phase) {
          finalres.push({
            name: re.phase,
            children: []
          })
          finalres[i].children?.push({
            desription: re.description,
            descriptiondetails: re.descriptiondetails,
            istemplateordeployment: re.istemplateordeployment,
            activedeliverales: re.activedeliverales,
            responsibleteam: re.responsibleteam
          })
          
          i++; 
        } 
      }
    }

    return finalres;
  };

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
  private _transformer = (node: any, level: number) => {
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
  exceldataSource: any[] = [];
  excelresult: any[] = [];
  constructor(
    private _api: ApiService,
    private router: Router) {
    this.dataSource.data = TREE_DATA;
    // this.exceldataSource = [];
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onClickLogout() {
    console.log("assd");
    localStorage.removeItem('userData');
    localStorage.removeItem('authtoken');
    localStorage.removeItem('usertype');
    this.router.navigate(['/']);
  }

  showOptions(event: any) {
    if(event.checked) {
      
    } else {

    }
  }

}



