import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit {
  constructor() {}
  geoQuestionsArray = [
    {
      id: 1,
      label: 'which State?'
    },
    {
      id: 2,
      label: 'which District?'
    },
    {
      id: 3,
      label: 'which Town?'
    },
    {
      id: 1,
      label: 'which State?'
    },
    {
      id: 2,
      label: 'which District?'
    },
    {
      id: 3,
      label: 'which Town?'
    },
    {
      id: 1,
      label: 'which State?'
    },
    {
      id: 2,
      label: 'which District?'
    },
    {
      id: 3,
      label: 'which Town?'
    }
  ];
  funQuestionsArray = [
    {
      id: 1,
      label: 'Gender?'
    },
    {
      id: 2,
      label: 'Crops Types?'
    },
    {
      id: 3,
      label: 'Household?'
    },
    {
      id: 1,
      label: 'Gender?'
    },
    {
      id: 2,
      label: 'Crops Types?'
    },
    {
      id: 3,
      label: 'Household?'
    },
    {
      id: 1,
      label: 'Gender?'
    },
    {
      id: 2,
      label: 'Crops Types?'
    },
    {
      id: 3,
      label: 'Household?'
    }
  ];
  ngOnInit() {}
}
